function getTrees(topo) {
	var trees = new Map();
	for (var k = 0; k < topo.nodes.length; ++k) {
		var curNode = topo.nodes[k];
		curNode.child = [];
		curNode.flag = true;
		curNode.x = 0;
		curNode.y = 0;
		curNode.height = 0;
		curNode.align = 'left';
		trees.set(curNode.id, curNode);
	}
	for (var i = 0; i < topo.links.length; ++i) {
		if (topo.links[i].linkType == 1) {
			if (trees.has(topo.links[i].source) && trees.has(topo.links[i].target)) {
				trees.get(topo.links[i].source).child.push(trees.get(topo.links[i].target));
				topo.links[i].sourceObj = trees.get(topo.links[i].source)
				topo.links[i].targetObj = trees.get(topo.links[i].target)
			}
			if (trees.has(topo.links[i].target)) {
				trees.get(topo.links[i].target).flag = false;
			}
		}
	}
	for (var i = 0; i < topo.links2.length; ++i) {
		if (topo.links2[i].linkType == 0) {
			topo.links2[i].sourceObj = trees.get(topo.links2[i].source)
			topo.links2[i].targetObj = trees.get(topo.links2[i].target)
		}
	}
	return trees;
}

function calcNodePos(trees, node, xpos, ypos, xscale, yscale) {
	if (xscale < 0) {
		node.align = 'right';
	}
	node.x = xpos + xscale;
	node.y = ypos + yscale;
	for (var i = 0; i < node.child.length; ++i) {
		node.height += calcNodePos(trees, trees.get(node.child[i].id), node.x, node.y + node.height, xscale, yscale);
	}
	return node.height + yscale;
}

function getMaxFloor(treeData) {
	let max = 0

	function each(data, floor) {
		data.forEach(e => {
			e.floor = floor
			if (floor > max) {
				max = floor
			}
			if (e.child.length > 0) {
				each(e.child, floor + 1)
			}
		})
	}
	each(treeData, 1)
	return max
}

function getRxpos(arr) {
	let rx,
		leftMax = 0,
		rightMax = 0
	let obj = _.groupBy(arr, 'align')
	if (obj.left) {
		leftMax = _.maxBy(obj.left, function (o) {
			return o.plies
		}).plies
	}
	if (obj.right) {
		rightMax = _.maxBy(obj.right, function (o) {
			return o.plies
		}).plies
	}
	rx = leftMax + rightMax
	return rx
}

function doSDTopoLayout(topo, lxpos, lypos, rypos, xscale, yscale) {
	var trees = getTrees(topo)
	let arr = []
	for (var node of trees.values()) {
		if (node.flag) {
			if (node.displayType == 'order' || node.displayType == 'account' || node.displayType == 'cfs') {
				arr.push({
					align: 'left',
					plies: getMaxFloor(node.child)
				})
			} else {
				arr.push({
					align: 'right',
					plies: getMaxFloor(node.child)
				})
			}
		}
	}
	let rpos = lxpos + 180 + (getRxpos(arr) + 2) * 150 + 300
	for (var node of trees.values()) {
		if (node.flag) {
			if (node.displayType == 'order' || node.displayType == 'account' || node.displayType == 'cfs') {
				lypos += calcNodePos(trees, node, lxpos, lypos, xscale, yscale);
			} else {
				rypos += calcNodePos(trees, node, rpos, rypos, xscale * (-1), yscale);
			}
		}
	}
}