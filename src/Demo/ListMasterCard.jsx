import { useState } from 'react';
import {
	CellMeasurer,
	CellMeasurerCache,
	Masonry,
	WindowScroller,
} from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';

const ListMasterCard = () => {
	const [columnWidth] = useState(220);
	const [columnCount] = useState(4);
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
	};
	return (
		<div>
			<WindowScroller>
				{({ height, isScrolling, registerChild, scrollTop }) => (
					<Masonry
						autoHeight
						cellCount={30}
						cellMeasurerCache={_cache}
						cellPositioner={_cellPositioner}
						cellRenderer={_cellRenderer}
						height={height}
						overscanByPixels={0}
						scrollTop={scrollTop}
						width={900}
					/>
				)}
			</WindowScroller>
		</div>
	)
}

export default ListMasterCard