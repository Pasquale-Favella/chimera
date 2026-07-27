import type { UINode, UINodeLayout, UINodeStyle } from "./ui-node.schema";

type UpdateNodeChanges = {
	type?: string;
	layout?: Partial<UINodeLayout> | null;
	style?: Partial<UINodeStyle> | null;
	props?: Record<string, unknown> | null;
};

export type UINodePatch =
	| {
			type: "update";
			nodeId: string;
			changes: UpdateNodeChanges;
	  }
	| {
			type: "insertChild";
			parentId: string;
			index?: number;
			node: UINode;
	  }
	| {
			type: "removeChild";
			parentId: string;
			nodeId: string;
	  };

function mergeObject<T extends Record<string, unknown>>(
	current: T | undefined,
	changes: Partial<T> | null | undefined,
) {
	if (changes == null) {
		return undefined;
	}

	return {
		...(current ?? {}),
		...changes,
	} as T;
}

function applyUpdate(node: UINode, changes: UpdateNodeChanges): UINode {
	const nextType = changes.type ?? node.type;
	const nextLayout =
		changes.layout === null
			? undefined
			: (mergeObject(node.layout, changes.layout) ?? node.layout);
	const nextStyle =
		changes.style === null
			? undefined
			: (mergeObject(node.style, changes.style) ?? node.style);
	const nextProps =
		changes.props === null
			? undefined
			: (mergeObject(node.props, changes.props) ?? node.props);

	if (
		nextType === node.type &&
		nextLayout === node.layout &&
		nextStyle === node.style &&
		nextProps === node.props
	) {
		return node;
	}

	return {
		...node,
		type: nextType,
		layout: nextLayout,
		style: nextStyle,
		props: nextProps,
	};
}

export function patchUINodeTree(root: UINode, patch: UINodePatch): UINode {
	let matched = false;

	function patchNode(node: UINode): UINode {
		if (patch.type === "update") {
			if (node.id === patch.nodeId) {
				matched = true;
				return applyUpdate(node, patch.changes);
			}
		}

		if (!node.children?.length) {
			return node;
		}

		if (patch.type === "insertChild" && node.id === patch.parentId) {
			matched = true;
			const nextChildren = [...node.children];
			const insertIndex =
				patch.index === undefined
					? nextChildren.length
					: Math.max(0, Math.min(patch.index, nextChildren.length));
			nextChildren.splice(insertIndex, 0, patch.node);

			return {
				...node,
				children: nextChildren,
			};
		}

		if (patch.type === "removeChild" && node.id === patch.parentId) {
			const nextChildren = node.children.filter(
				(child) => child.id !== patch.nodeId,
			);
			if (nextChildren.length === node.children.length) {
				console.warn(
					`[patchUINodeTree] removeChild: child "${patch.nodeId}" not found in parent "${patch.parentId}"`,
				);
				return node;
			}
			matched = true;
			return {
				...node,
				children: nextChildren,
			};
		}

		let didChange = false;
		const nextChildren = node.children.map((child) => {
			const nextChild = patchNode(child);
			if (nextChild !== child) {
				didChange = true;
			}
			return nextChild;
		});

		if (!didChange) {
			return node;
		}

		return {
			...node,
			children: nextChildren,
		};
	}

	const result = patchNode(root);

	if (!matched) {
		console.warn(
			`[patchUINodeTree] Patch of type "${patch.type}" matched no node in the tree.`,
		);
	}

	return result;
}
