// app/fonts.ts
import localFont from 'next/font/local';

export const jetbrainsMono = localFont({
  src: './fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf',
  variable: '--font-jetbrains',
  display: 'swap',
});

export const montserrat = localFont({
  src: './fonts/Montserrat/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: './fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf',
  variable: '--font-space-grotesk',
  display: 'swap',
});
export const cubano = localFont({
  src: './fonts/cubano/Cubano.ttf',
  variable: '--font-cubano',
  display: 'swap',
});
