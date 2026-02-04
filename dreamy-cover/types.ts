
export type Orientation = 'horizontal' | 'vertical';
export type BackgroundEffect = 'orbs' | 'grid' | 'dust' | 'mesh';

export interface CoverSettings {
  title: string;
  subtitle: string;
  orientation: Orientation;
  primaryColor: string;
  secondaryColor: string;
  glowIntensity: number;
  waveSpeed: number;
  // Text Controls
  titleFontSize: number;
  titleLetterSpacing: number;
  titleLineHeight: number;
  titleOffsetY: number;
  subtitleFontSize: number;
  subtitleOffsetY: number;
  textAlign: 'left' | 'center' | 'right';
  // New Background Effects
  backgroundEffect: BackgroundEffect;
}

export type AIEditResult = string | null;

export interface AIEditResponse {
  imageUrl: string;
  error?: string;
}
