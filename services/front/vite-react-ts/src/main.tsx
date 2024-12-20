import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeWrapper } from './Providers/Theme';
import { WindowWrapper } from './Providers/Windows';
import { ImageWrapper } from './Providers/Image';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeWrapper>
      <WindowWrapper>
        <ImageWrapper>
          <App />
        </ImageWrapper>
      </WindowWrapper>
    </ThemeWrapper>
  </StrictMode>,
)
