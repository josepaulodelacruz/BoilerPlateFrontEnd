import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsconfigPath from 'vite-jsconfig-paths';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPath()],
  base: "/DAR",
  // build: {
  //   // This assumes your React project folder is a sibling to your .NET project's wwwroot.
  //   // Adjust the path resolution (e.g., '../../NetTemplate_React/wwwroot') as necessary 
  //   // based on where your React project sits relative to the wwwroot folder.
  //   outDir: path.resolve(__dirname, '..', 'NetTemplate_React', 'wwwroot'),
  //   emptyOutDir: true, // Clean the directory before building
  // },
})
