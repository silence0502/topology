function getTrees(topo) {
	var trees = new Map();
	for (var k = 0; k < topo.nodes.length; ++k) {
		var curNode = topo.nodes[k];
		curNode.child = [];
		curNode.flag = true;
		curNode.x = 0;
		curNode.y = 0;
		curNode.height = 0;
		trees.set(curNode.id, curNode);
	}
	for (var i = 0; i < topo.links.length; ++i) {
		if (topo.links[i].linkType == 1) {
			if (trees.has(topo.links[i].source) && trees.has(topo.links[i].target)) {
				trees.get(topo.links[i].source).child.push(topo.links[i].target);
			}
			if (trees.has(topo.links[i].target)) {
				trees.get(topo.links[i].target).flag = false;
			}
		}
	}
	return trees;
}

function calcNodePos(trees, node, xpos, ypos, xscale, yscale) {
	node.x = xpos + xscale;
	node.y = ypos + yscale;
	for (var i = 0; i < node.child.length; ++i) {
		node.height += calcNodePos(trees, trees.get(node.child[i]), node.x, node.y + node.height, xscale, yscale);
	}
	return node.height + yscale;
}

function doSDTopoLayout(topo, lxpos, rxpos, lypos, rypos, xscale, yscale) {
	var trees = getTrees(topo)
	for (var node of trees.values()) {
		if (node.flag) {
			if (node.align == 'right') {
				rypos += calcNodePos(trees, node, rxpos, rypos, xscale * (-1), yscale);
			} else {
				lypos += calcNodePos(trees, node, lxpos, lypos, xscale, yscale);
			}
		}
	}
}