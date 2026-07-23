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
	if (patch.type === "update") {
		if (root.id === patch.nodeId) {
			return applyUpdate(root, patch.changes);
		}
	}

	if (!root.children?.length) {
		return root;
	}

	if (patch.type === "insertChild" && root.id === patch.parentId) {
		const nextChildren = [...root.children];
		const insertIndex =
			patch.index === undefined
				? nextChildren.length
				: Math.max(0, Math.min(patch.index, nextChildren.length));
		nextChildren.splice(insertIndex, 0, patch.node);

		return {
			...root,
			children: nextChildren,
		};
	}

	if (patch.type === "removeChild" && root.id === patch.parentId) {
		const nextChildren = root.children.filter(
			(child) => child.id !== patch.nodeId,
		);
		if (nextChildren.length === root.children.length) {
			return root;
		}

		return {
			...root,
			children: nextChildren,
		};
	}

	let didChange = false;
	const nextChildren = root.children.map((child) => {
		const nextChild = patchUINodeTree(child, patch);
		if (nextChild !== child) {
			didChange = true;
		}
		return nextChild;
	});

	if (!didChange) {
		return root;
	}

	return {
		...root,
		children: nextChildren,
	};
}
