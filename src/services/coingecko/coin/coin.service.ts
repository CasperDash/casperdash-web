import * as _ from 'lodash-es';

import {
  CoingeckoCurrentDataCoin,
  CoingeckoCoin,
  CoingeckoHistory,
} from './type';
import request from '../request';

export const getCoin = async (): Promise<CoingeckoCoin> => {
  const data: CoingeckoCurrentDataCoin = await request.get(
    '/coins/casper-network',
    {
      params: {
        localization: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    }
  );

  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    price: _.get(data, 'market_data.current_price.usd', 0),
    marketCap: <number>_.get(data, 'market_data.market_cap.usd', 0),
    dailyVolume: <number>_.get(data, 'market_data.total_volume.usd', 0),
    priceChangePercentage24h: _.get(
      data,
      'market_data.price_change_percentage_24h',
      0
    ),
  };
};

export const getCoinHistories = async (): Promise<CoingeckoHistory[]> => {
  const data: { prices: [number, number][] } = await request.get(
    '/coins/casper-network/market_chart',
    {
      params: {
        vs_currency: 'usd',
        days: 30,
      },
    }
  );

  if (_.isEmpty(data.prices)) {
    return [];
  }

  return data.prices.map((coinData: [number, number]) => {
    return {
      timestamp: _.get(coinData, '[0]', 0),
      value: _.get(coinData, '[1]', 0),
    };
  });
};
