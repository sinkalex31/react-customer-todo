import React from 'react';
import { debounce } from 'lodash';
import { LatLngTuple } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { AutoComplete, Icon, Input } from 'antd';
import { Map } from '../Map';

const provider = new OpenStreetMapProvider();

interface IResult {
	value: string;
	text: string;
	position: number[];
}

interface IProps {
	onChange: (value: any) => void;
	value?: {
		line1: string;
		line2: string;
	};
}

export const AddressSearch: React.FC<IProps> = React.forwardRef(
	(props, ref) => {
		const [results, setResults] = React.useState<IResult[]>([]);
		const [inputValue, setInputValue] = React.useState<string>(
			props.value ? props.value.line1 : '',
		);
		const [selected, setSelected] = React.useState<LatLngTuple | null>(
			props.value
				? (props.value.line2.split(',').map(Number) as LatLngTuple)
				: null,
		);

		const onSearch = React.useCallback(
			debounce(async (query: string) => {
				const searchResults = await provider.search({ query });
				const results = searchResults.map((place) => ({
					value: place.raw.place_id.toString(),
					text: place.label,
					position: [Number(place.y), Number(place.x)],
				}));

				setResults(results);
			}, 300),
			[],
		);

		const onChange = React.useCallback((value) => {
			setInputValue(value);
		}, []);

		const onSelect = React.useCallback(
			(value) => {
				const result = results.find((result) => result.value === value);

				if (result) {
					// Stripe api has limit for metadata, only 500 chars allowed
					// This why needs to store address information in string format
					props.onChange({
						line1: result.text,
						line2: result.position.toString(),
					});
					setSelected(result.position as LatLngTuple);
				}
			},
			[props.onChange, results],
		);

		return (
			<>
				<AutoComplete
					value={inputValue}
					dataSource={results}
					onSelect={onSelect}
					onSearch={onSearch}
					onChange={onChange}
				>
					<Input
						prefix={<Icon type="google" />}
						placeholder="Address"
					/>
				</AutoComplete>
				{selected && <Map point={selected} />}
			</>
		);
	},
);
