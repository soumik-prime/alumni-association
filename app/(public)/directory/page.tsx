import type { Metadata } from "next";
import SearchBar from "./_components/SearchBar";
import CardGrid from "./_components/CardGrid";
import FilterChips from "./_components/FilterChip";
import { FilterButton } from "./_components/FilterButton";
import Title from "../_components/Title";
import Filter from "./_components/Filter";

export const metadata: Metadata = {
	title: "Directory",
	description:
		"Browse the alumni and student directory for the Department of CSE at Netrokona University.",
};

export default async function Page() {
	// { searchParams }: { searchParams: Promise<{ q?: string; batch?: string; session?: string; city?: string; page?: string }> }
	// const params = await searchParams;
	// const batch = params.batch ? Number(params.batch) : undefined;
	// const page = params.page ? Number(params.page) : 1;
	// const result = await getPublicProfiles({ query: params.q, batch: Number.isFinite(batch) ? batch : undefined, session: params.session, city: params.city, page });
	const bgColor = "bg-linear-to-r from-green-50/80 via-white to-emerald-50/80";
	const title = "Alumni & Student Directory";
	const description =
		"Find and explore alumni and student profiles, and connect with the wider CSE community.";
	const maxWidth = "w-full max-w-screen-2xl mx-auto";

	return (
		<main id="main-content" className={bgColor} aria-label="Main content">
			<Title {...{ title, description, maxWidth }} />

			<div className="px-6 py-4 grid grid-cols-[1fr_auto] items-stretch gap-2">
				<SearchBar />

				<FilterButton />
			</div>
			<div
				className={`${maxWidth} w-full max-w-screen-2xl mx-auto lg:grid grid-cols-4 px-2 lg:px-6 pb-10 gap-10`}
			>
				<div className="col-span-1 hidden lg:block">
					<Filter />
				</div>
				<div className="md:col-span-3">
					<FilterChips></FilterChips>
					<CardGrid></CardGrid>
					{/* <Pagination {...{total: 200, page: 1, pageSize: 9, paramKey: "page"}}></Pagination> */}
				</div>
			</div>

			{/* <DirectoryView profiles={result.profiles} total={result.total} page={result.page} totalPages={result.totalPages} query={params.q} batch={Number.isFinite(batch) ? batch : undefined} session={params.session} city={params.city} /> */}
		</main>
	);
}
