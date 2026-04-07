import {
  Group,
  Text,
  Collapse,
  Box,
  Center,
  VisuallyHidden
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './index.css';
import { ChevronRight } from 'lucide-react';

const NavItems = ({
  leftIcon = null,
  label = "",
  children = null,
  havePermission = false,
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box style={{ display: havePermission ? 'block' : 'none' }} >
      <Group className='nav-item-container' py={5} align='center' justify='space-between' onClick={toggle}>
        <Group align='center' justify='center'>
          <Box className='nav-item-icon-container' p={5} >
            <Center>
              {leftIcon}
            </Center>
          </Box>
          <Text>
            {label}
          </Text>
        </Group>
        {
          children && (
            <ChevronRight size={16} />
          )
        }
      </Group>
      <Collapse className='nav-collapsible-items-container' in={opened}>
        {children}
      </Collapse>
    </Box>
  )
}

export {
  NavItems,
}



