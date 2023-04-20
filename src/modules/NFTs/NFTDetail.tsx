import { FC } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from '@chakra-ui/react';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { INFTInfo } from '@/services/casperdash/nft/type';

export interface INFTDetailProps {
  nftDetail: INFTInfo;
  onBack?: () => void;
}

export const NFTDetail: FC<INFTDetailProps> = ({ nftDetail, onBack }) => {
  return (
    <Flex mt={{ base: 4 }} direction={{ base: 'column' }}>
      <Button
        leftIcon={<ArrowBackIcon />}
        variant={'outline'}
        w={{ base: '28' }}
        onClick={onBack}
      >
        Back
      </Button>
      <Divider mt={{ base: '4' }} />
      <Flex
        direction={'column'}
        alignItems={{ base: 'center' }}
        mt={{ base: '6' }}
        gap={{ base: '4' }}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {nftDetail.nftName} #{nftDetail.tokenId}
        </Text>
        <Box
          h={{ base: '200', md: '400' }}
          w={{ base: '100%', md: '80%' }}
          mt={{ base: '4' }}
        >
          <Image
            src={nftDetail.image}
            alt="NFT image"
            borderRadius="3xl"
            objectFit={'contain'}
            w={'100%'}
            h={'100%'}
          />
        </Box>
        <Divider />
        {/* <Text color={'gray.400'}>{nftDetail.}</Text> */}
        <Flex direction={'column'} alignSelf={{ base: 'flex-start' }}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Details
          </Text>
          {!!nftDetail.totalSupply && (
            <Text>Total Supply: {parseInt(nftDetail.totalSupply?.hex)}</Text>
          )}
          {!!nftDetail.contractName && (
            <Text>
              Contract Name: <span>{nftDetail.contractName}</span>
            </Text>
          )}
          {!!nftDetail.contractAddress && (
            <Text>
              Contract Address:{' '}
              <MiddleTruncatedText value={nftDetail.contractAddress} />
            </Text>
          )}
        </Flex>
        <Flex
          direction={'column'}
          alignSelf={{ base: 'flex-start' }}
          w={{ base: '100%' }}
          mb={'4'}
        >
          <Text fontSize={'xl'} fontWeight={'bold'} mb={{ base: '2' }}>
            Attributes
          </Text>
          <Grid
            gridTemplateColumns={{
              base: '1',
              lg: 'repeat(4,1fr)',
              md: 'repeat(2,1fr)',
            }}
            width={{ base: '100%' }}
            gap={{ base: '2' }}
          >
            {nftDetail.metadata?.map((item) => (
              <Card
                key={item.key}
                width={{ base: '100%' }}
                border={'1px'}
                borderColor={'gray.200'}
              >
                <CardBody>
                  <Text color={'gray.400'}>{item.key}</Text>
                  <Text>{item.value}</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};
