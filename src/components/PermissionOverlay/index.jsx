import { Overlay, Paper, Center, Alert, Text } from "@mantine/core";
import { TriangleAlert } from 'lucide-react'

const PermissionOverlay = ({
  isVisible = false,
}) => {
  if (!isVisible) {
    return (
      <Overlay blur={15} fixed zIndex={1000}>
        <Center style={{ height: "100vh" }}>
          <Paper
            shadow="xl"
            radius="md"
            p="xl"
            withBorder
            style={{ minWidth: 320, maxWidth: '90vw', textAlign: "center" }}
          >
            <Alert
              color="red"
              title="Ooops! Something went wrong."
              icon={<TriangleAlert />}
              variant="light"
            >
              <Text fw={300} size="sm" ta="left">
                You don't have permission to access this module.
                <Text component="span" display="block" mt={4}>
                  Please contact IT Department to grant you access.
                </Text>
              </Text>
            </Alert>
          </Paper>
        </Center>
      </Overlay>
    )
  }
}

export default PermissionOverlay;
