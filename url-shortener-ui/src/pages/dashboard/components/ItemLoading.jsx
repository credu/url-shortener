export const ItemLoading = () => {
    return (
        <article className="relative border rounded-md">
            <header className="border-b flex flex-row items-center justify-between">
                <div className="animate-pulse h-[16px] ml-2 bg-zinc-500 rounded w-1/2"></div>
                <button
                    type="button"
                    className="px-2"
                >
                    x
                </button>
            </header>
            <div className="animate-pulse px-2 py-3">
                <div className="h-[16px] bg-zinc-500 rounded w-full mb-3"></div>
                <div className="h-[26px] w-full bg-zinc-500"></div>
            </div>
        </article>
    );
};
