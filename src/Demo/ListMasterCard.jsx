import { useState } from 'react';
import {
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry,
	WindowScroller,
} from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';

const ListMasterCard = () => {
	const [columnWidth, setColumnWidth] = useState(220);
	const [columnCount, setColumnCount] = useState(4);
	const _cache = new CellMeasurerCache({
		defaultHeight: 250,
		defaultWidth: 200,
		fixedWidth: true,
	});

	const _cellPositioner = createCellPositioner({
		cellMeasurerCache: _cache,
		columnCount,
		columnWidth,
		spacer: 24,
	});

	const _cellRenderer = ({ index, key, parent, style }) => {
		return (
			<CellMeasurer cache={_cache} index={index} key={key} parent={parent}>
				<div
					style={{
						...style,
						width: columnWidth,
						// height: 386,
					}}
				>
					{index}
				</div>
			</CellMeasurer>
		);
	};
	const _onResize = ({ width }) => {
		setColumnCount(width / (columnWidth + 24));
		_cellPositioner.reset({
			columnCount,
			columnWidth,
			spacer: 24,
		});
		// _masonry.recomputeCellPositions();
	};
	return (
		<div>
			<WindowScroller scrollElement={this.context.customElement}>
				{({ height, scrollTop }) => (
					// <AutoSizerVirtualized
					//   disableHeight
					//   height={height}
					//   onResize={_onResize}
					//   overscanByPixels={386}
					//   scrollTop={scrollTop}
					// >
					//   {() => (
					<Masonry
						autoHeight
						cellCount={30}
						cellMeasurerCache={_cache}
						cellPositioner={_cellPositioner}
						cellRenderer={_cellRenderer}
						height={900}
						width={900}
						scrollTop={scrollTop}
						overscanByPixels={386}
					/>
					//   )}
					// </AutoSizerVirtualized>
				)}
			</WindowScroller>
		</div>
	)
}

export default ListMasterCard