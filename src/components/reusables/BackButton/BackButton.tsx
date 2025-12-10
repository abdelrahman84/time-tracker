import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface BackButtonProps {
  onHandleBack: () => void;
}

function BackButton(props: BackButtonProps) {
  return (
    <Button onClick={props.onHandleBack} variant="link">
      <ArrowBackIcon />
    </Button>
  );
}

export default BackButton;
