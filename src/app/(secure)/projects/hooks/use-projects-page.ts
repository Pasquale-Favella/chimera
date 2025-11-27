import { atom, useAtom } from "jotai";

export const PROJECTS_PAGE_SIZE = 10;

const viewModeAtom = atom<"grid" | "list">("grid");
const searchAtom = atom("");
const pageAtom = atom(1);
const limitAtom = atom(PROJECTS_PAGE_SIZE);

export function useProjectsPage() {
    const [viewMode, setViewMode] = useAtom(viewModeAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [page, setPage] = useAtom(pageAtom);
    const [limit, setLimit] = useAtom(limitAtom);

    const handleSetSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return {
        viewMode,
        setViewMode,
        search,
        setSearch: handleSetSearch,
        page,
        setPage,
        limit,
        setLimit,
    };
}
