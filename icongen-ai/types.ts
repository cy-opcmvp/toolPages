export interface GradientStop {
  offset: number; // 0 to 1
  color: string;
}

export interface IconConfig {
  // Content
  contentMode: 'text' | 'image';
  text: string;
  imageSrc: string | null; // Data URL for uploaded image
  
  // Text Styling
  textColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string; // 'normal' | 'bold'
  fontStyle: string;  // 'normal' | 'italic'
  textPositionX: number; // Offset from center
  textPositionY: number; // Offset from center
  letterSpacing: number; // px
  lineHeight: number; // multiplier (e.g. 1.2)
  textAlign: 'left' | 'center' | 'right';

  // Background
  bgType: 'solid' | 'gradient-linear' | 'gradient-radial';
  bgColor: string; // Used for solid
  bgGradientStops: GradientStop[];
  bgGradientAngle: number; // 0-360 for linear

  // Border & Shape
  borderColor: string;
  borderWidth: number;
  borderRadius: number; // 0 to 50

  // Texture/Pattern
  pattern: 'none' | 'grid' | 'stripes' | 'waves';
  patternColor: string;
  patternLineWidth: number;
  patternSpacing: number;
  patternAngle: number; // 0-360 degrees
  patternOpacity: number; // 0 to 1
}

export interface GeneratedImage {
  dataUrl: string;
  prompt: string;
}

export interface Preset {
  name: string;
  config: Partial<IconConfig>;
}

export interface ExportSize {
  name: string;
  width: number;
  height: number;
}
