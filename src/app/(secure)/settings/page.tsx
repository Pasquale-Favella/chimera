import { SettingsForm } from "@/features/settings/settings-form";
import { withSession } from "@/lib/session-check.utils";

export default async function SettingsPage() {
    await withSession();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm />
        </div>
    );
}
