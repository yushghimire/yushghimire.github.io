var main = document.getElementById("main-wrapper");

var data=[{

	tagName: 'div',
	className: 'test-class',
	styles:{
		width: '100px',
		height: '100px',
		backgroundColor:'red'
	},

	children: [
	{
		tagName: 'div',
		className: 'box',
		styles:{
			width: '50px',
			height: '50px',
			backgroundColor:'blue'
		},
	},
	{
		tagName: 'div',
		className: 'box',
		styles:{
			width: '50px',
			height: '50px',
			backgroundColor:'green',
			float: 'right'
		}
	}
	]
}
];

for (var i = 0; i < data.length; i++) {

    createDiv(data[i]);
}

function createDiv(item) {

    var parent =jsonToHtml(item);

    for (var i = 0; i < item.children.length; i++) {

        parent.appendChild(jsonToHtml(item.children[i]));
    }
    
    main.appendChild(parent);
}

function jsonToHtml(item) {

    var element = document.createElement(item.tagName);

    element.setAttribute('class', item.className);

    for (style in item.styles) {

        element.style[style] = item.styles[style];
    }

    return element;
}
