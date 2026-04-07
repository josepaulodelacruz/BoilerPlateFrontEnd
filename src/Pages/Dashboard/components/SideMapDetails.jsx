import {
  Paper,
  Burger,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router';


const SideMapDetail = ({ backgroundColor, children, height }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <Paper
      radius={0}
      style={{ zIndex: 10, height: height, width: '25%', position: 'absolute' }}
      bg={backgroundColor}
      p={10}
    >
      <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
      <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
      <Space h={10} />
    </Paper>

  );
}

export default SideMapDetail; 
