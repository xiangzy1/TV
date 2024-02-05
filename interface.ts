export interface IFFProbeResponse {
  streams: FFStream[]
  format: FFFormat
}

export interface FFStream {
  index: number
  codec_name: string
  codec_long_name: string
  profile: string
  codec_type: string
  codec_tag_string: string
  codec_tag: string
  width?: number
  height?: number
  coded_width?: number
  coded_height?: number
  closed_captions?: number
  film_grain?: number
  has_b_frames?: number
  sample_aspect_ratio?: string
  display_aspect_ratio?: string
  pix_fmt?: string
  level?: number
  color_range?: string
  chroma_location?: string
  refs?: number
  r_frame_rate: string
  avg_frame_rate: string
  time_base: string
  start_pts: number
  start_time: string
  extradata_size?: number
  disposition: Disposition
  tags: Tags
  sample_fmt?: string
  sample_rate?: string
  channels?: number
  channel_layout?: string
  bits_per_sample?: number
  initial_padding?: number
}

interface Disposition {
  default: number
  dub: number
  original: number
  comment: number
  lyrics: number
  karaoke: number
  forced: number
  hearing_impaired: number
  visual_impaired: number
  clean_effects: number
  attached_pic: number
  timed_thumbnails: number
  non_diegetic: number
  captions: number
  descriptions: number
  metadata: number
  dependent: number
  still_image: number
}

interface Tags {
  variant_bitrate: string
}

export interface FFFormat {
  filename: string
  nb_streams: number
  nb_programs: number
  format_name: string
  format_long_name: string
  start_time: string
  size: string
  probe_score: number
}
