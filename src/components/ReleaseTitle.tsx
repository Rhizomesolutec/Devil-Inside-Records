export function ReleaseTitle({
    id,
    title,
}: {
    id?: string;
    title: string;
}) {
    if (id === "mostly-owh" || title === "mostly OWH") {
        return (
            <>
                <span className="font-serif lowercase tracking-wide font-medium [font-family:ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif] [font-variant:normal] [font-variant-caps:normal] [text-transform:lowercase]">
                    mostly
                </span>{" "}
                <span className="font-cinzel font-black uppercase tracking-tighter">OWH</span>
            </>
        );
    }

    return <>{title}</>;
}
