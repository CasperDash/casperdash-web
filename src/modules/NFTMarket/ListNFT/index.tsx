import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from '@chakra-ui/react';

import ListAnNFTItem from './ListAnNFTItem';
import NFTSelect from './NFTSelect';

const steps = [
  { title: 'Step 1', description: 'Choose your NFT' },
  { title: 'Step 2', description: 'List NFT' },
  { title: 'Final', description: 'Submit' },
];

const ListNFT = () => {
  const { activeStep, goToNext } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Box mt={{ base: '6', lg: '20' }}>
      <Box>
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        {activeStep === 0 && <NFTSelect onNext={goToNext} />}
        {activeStep === 1 && <ListAnNFTItem onNext={goToNext} />}
      </Box>
    </Box>
  );
};

export default ListNFT;
