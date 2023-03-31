import React from "react";
import {
	CellMeasurer,
	CellMeasurerCache,
	AutoSizer,
	WindowScroller,
	Masonry
} from "react-virtualized";
import PropTypes from "prop-types";

import { createCellPositioner, MasonryCellProps } from 'react-virtualized/dist/es/Masonry';

class OverviewList extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			columnWidth: 200,
			height: 300,
			gutterSize: 10
		};

		this._cache = new CellMeasurerCache({
			defaultHeight: 250,
			defaultWidth: 200,
			fixedWidth: true
		});

		this._onResize = this._onResize.bind(this);
		this._cellRenderer = this._cellRenderer.bind(this);
		this._setMasonryRef = this._setMasonryRef.bind(this);
		this._calculateColumnCount = this._calculateColumnCount.bind(this);
		this._resetCellPositioner = this._resetCellPositioner.bind(this);
	}

	_calculateColumnCount() {
		const { columnWidth, gutterSize } = this.state;

		this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
	}

	_cellRenderer({ index, key, parent, style }) {
		console.log(index);
		const { items } = this.props;
		const { columnWidth } = this.state;

		return (
			<CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
				<div
					className={"cell"}
					style={{
						...style,
						width: columnWidth
					}}
				>
					<div
						style={{
							background: 'gray',
							borderRadius: "0.5rem",
							height: 386,
							marginBottom: "0.5rem",
							width: "100%",
							fontSize: 20,
							color: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						{index}
					</div>
				</div>
			</CellMeasurer>
		);
	}

	static contextTypes = {
		customElement: PropTypes.any
	};

	_setMasonryRef(ref) {
		this._masonry = ref;
	}

	_onResize({ width }) {
		this._width = width;

		this._calculateColumnCount();
		this._resetCellPositioner();
		// this._masonry.recomputeCellPositions();
	}

	_initCellPositioner() {
		if (typeof this._cellPositioner === "undefined") {
			const { columnWidth, gutterSize } = this.state;

			this._cellPositioner = createCellPositioner({
				cellMeasurerCache: this._cache,
				columnCount: this._columnCount,
				columnWidth,
				spacer: gutterSize
			});
		}
	}

	_resetCellPositioner() {
		const { columnWidth, gutterSize } = this.state;

		this._cellPositioner.reset({
			columnCount: this._columnCount,
			columnWidth,
			spacer: gutterSize
		});
	}

	render() {
		const { items } = this.props;
		this._initCellPositioner();

		return (
			<WindowScroller >
				{({ height, isScrolling, registerChild, scrollTop }) => (
					<Masonry
						autoHeight
						cellCount={10}
						cellMeasurerCache={this._cache}
						cellPositioner={this._cellPositioner}
						cellRenderer={this._cellRenderer}
						height={height}
						overscanByPixels={0}
						scrollTop={scrollTop}
						width={900}
					/>
				)}
			</WindowScroller>
		);
	}
}

export default OverviewList;
