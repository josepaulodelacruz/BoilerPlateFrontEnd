import { useEffect, useRef, useState } from 'react'
import {
  Text,
  Title,
  Paper,
  Box,
  Flex,
  ThemeIcon,
  Space,
  Image,
} from '@mantine/core'
import { Upload } from 'lucide-react'

const ImagePreview = ({ onChange, image = null }) => {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (image) {
      setPreview(image)
    }
  }, [image])

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Only PNG and JPG images are allowed')
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)

    // Pass the actual File object to the parent component
    onChange(file)
  }

  return (
    <>
      <Title order={4} fw={400}>
        Cover Photo
      </Title>
      <Paper
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        shadow="none"
        radius="sm"
        withBorder
        p="md"
      >
        {!preview ? (
          <Flex direction="column" h={150} justify="center" align="center">
            <ThemeIcon size="lg" variant="light">
              <Upload />
            </ThemeIcon>
            <Space h={10} />
            <Title order={5} fw={400}>
              Click to upload an image
            </Title>
            <Box mt={10}>
              <Text size="sm" c="dimmed">
                Supported: PNG, JPG
              </Text>
            </Box>
          </Flex>
        ) : (
          <Image
            src={preview}
            alt="Preview"
            radius="sm"
            h={150}
            fit="contain"
          />
        )}
      </Paper>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  )
}

export default ImagePreview
