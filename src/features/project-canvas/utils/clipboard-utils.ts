import type { AttachedImage } from "@/types/design";

export const handleImagePaste = async (
    event: React.ClipboardEvent,
): Promise<AttachedImage[]> => {
    const items = event.clipboardData?.items;
    if (!items) return [];

    const imagePromises: Promise<AttachedImage>[] = [];

    for (const item of items) {
        if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            if (file) {
                const promise = new Promise<AttachedImage>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (loadEvent) => {
                        const dataUrl = loadEvent.target?.result as string;
                        if (!dataUrl) {
                            reject(new Error("Failed to read file"));
                            return;
                        }

                        const parts = dataUrl.split(",");
                        const meta = parts[0];
                        const base64 = parts[1];

                        if (!meta || !base64) {
                            reject(new Error("Invalid data URL"));
                            return;
                        }

                        const mimeTypeParts = meta.split(";");
                        const mimeType = mimeTypeParts[0]?.split(":")[1];

                        if (!mimeType) {
                            reject(new Error("Invalid mime type"));
                            return;
                        }

                        resolve({ dataUrl, base64, mimeType });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                imagePromises.push(promise);
            }
        }
    }

    if (imagePromises.length > 0) {
        event.preventDefault(); // Prevent default paste behavior if images are found
    }

    return Promise.all(imagePromises);
};
