const ShadcnUi = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		height={24}
		viewBox="0 0 24 24"
		width={24}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M19.5 12L12 19.5"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M18 3.75L3.75 18"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);
export default ShadcnUi;
