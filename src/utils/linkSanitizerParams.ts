export const LINK_SANITIZER_GROUP_IDS = [
  'analytics',
  'ads',
  'social',
  'email',
  'affiliates',
] as const

export type LinkSanitizerGroupId = (typeof LINK_SANITIZER_GROUP_IDS)[number]

type LinkSanitizerGroup = {
  id: LinkSanitizerGroupId
  titleKey:
    | 'wsext_link_sanitizer_analytics'
    | 'wsext_link_sanitizer_ads'
    | 'wsext_link_sanitizer_social'
    | 'wsext_link_sanitizer_email'
    | 'wsext_link_sanitizer_affiliates'
  descriptionKey:
    | 'wsext_link_sanitizer_analytics_description'
    | 'wsext_link_sanitizer_ads_description'
    | 'wsext_link_sanitizer_social_description'
    | 'wsext_link_sanitizer_email_description'
    | 'wsext_link_sanitizer_affiliates_description'
  params: string[]
}

export const LINK_SANITIZER_GROUPS: Record<LinkSanitizerGroupId, LinkSanitizerGroup> = {
  analytics: {
    id: 'analytics',
    titleKey: 'wsext_link_sanitizer_analytics',
    descriptionKey: 'wsext_link_sanitizer_analytics_description',
    params: [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'utm_id',
      'utm_referrer',
      'utm_name',
      'utm_source_platform',
      'utm_creative_format',
      'utm_marketing_tactic',
      '_ga',
      '_gl',
      'srsltid',
      'itm_campaign',
      'itm_medium',
      'itm_source',
      'otm_source',
      'otm_medium',
      'otm_campaign',
      'otm_content',
      'otm_term',
      'ga_source',
      'ga_medium',
      'ga_campaign',
      'ga_term',
      'ga_content',
      'gs_l',
      'mtm_campaign',
      'mtm_keyword',
      'mtm_source',
      'mtm_medium',
      'mtm_content',
      'mtm_cid',
      'mtm_group',
      'mtm_placement',
      'matomo_campaign',
      'matomo_keyword',
      'matomo_source',
      'matomo_medium',
      'matomo_content',
      'matomo_cid',
      'matomo_group',
      'matomo_placement',
      'pk_campaign',
      'pk_kwd',
      'pk_keyword',
      'pk_cid',
      'pk_medium',
      'pk_source',
      'piwik_campaign',
      'piwik_kwd',
      'piwik_keyword',
      'ym_tracking_id',
      'vgo_ee',
      'cx_click',
      'cx_recsOrder',
      'cx_recsWidget',
      'guce_referrer',
      'guce_referrer_sig',
    ],
  },
  ads: {
    id: 'ads',
    titleKey: 'wsext_link_sanitizer_ads',
    descriptionKey: 'wsext_link_sanitizer_ads_description',
    params: [
      'gclid',
      'gclsrc',
      'dclid',
      'gbraid',
      'wbraid',
      'gad_source',
      'gad_campaignid',
      'gPromoCode',
      'gQT',
      'msclkid',
      'yclid',
      'ymclid',
      'ysclid',
      'vmcid',
      'cmpid',
      '_openstat',
      'adsterra_clid',
      'adsterra_placement_id',
      'clckid',
      'gps_adid',
      'unicorn_click_id',
    ],
  },
  social: {
    id: 'social',
    titleKey: 'wsext_link_sanitizer_social',
    descriptionKey: 'wsext_link_sanitizer_social_description',
    params: [
      'fbclid',
      'fb_action_types',
      'fb_action_ids',
      'fb_source',
      'fb_ref',
      'fb_comment_id',
      'fbadid',
      'twclid',
      'igshid',
      'igsh',
      'ttclid',
      'ndclid',
      'ScCid',
      'epik',
      '__twitter_impression',
      'social_share',
      'si',
    ],
  },
  email: {
    id: 'email',
    titleKey: 'wsext_link_sanitizer_email',
    descriptionKey: 'wsext_link_sanitizer_email_description',
    params: [
      'mc_cid',
      'mc_eid',
      'mc_tc',
      'mc_',
      'hsa_cam',
      'hsa_grp',
      'hsa_mt',
      'hsa_src',
      'hsa_ad',
      'hsa_acc',
      'hsa_net',
      'hsa_kw',
      'hsa_tgt',
      'hsa_ver',
      'hsa_la',
      'hsa_ol',
      'hss_channel',
      '__hsfp',
      '__hssc',
      '__hstc',
      '_hsenc',
      'hsCtaTracking',
      '_ke',
      '_kx',
      'trk_contact',
      'trk_msg',
      'trk_module',
      'trk_sid',
      'mkt_tok',
      'ml_subscriber',
      'ml_subscriber_hash',
      'oly_anon_id',
      'oly_enc_id',
      '_bta_tid',
      '_bta_c',
      'dm_i',
      'sms_source',
      'sms_click',
      'sms_uph',
      'hmb_campaign',
      'hmb_medium',
      'hmb_source',
      'vero_conv',
      'vero_id',
      'wickedid',
      'at_campaign',
      'at_campaign_type',
      'at_creation',
      'at_emailtype',
      'at_link',
      'at_link_id',
      'at_link_origin',
      'at_link_type',
      'at_medium',
      'at_ptr_name',
      'at_recipient_id',
      'at_recipient_list',
      'at_send_date',
      'bbeml',
      'bsft_aaid',
      'bsft_clkid',
      'bsft_eid',
      'bsft_ek',
      'bsft_mid',
      'bsft_uid',
      'et_rid',
      'oft_c',
      'oft_ck',
      'oft_d',
      'oft_id',
      'oft_ids',
      'oft_k',
      'oft_lk',
      'oft_sk',
      'sc_customer',
      'sc_eh',
      'sc_uid',
      'sfmc_activityid',
      'sfmc_id',
      'ss_email_id',
    ],
  },
  affiliates: {
    id: 'affiliates',
    titleKey: 'wsext_link_sanitizer_affiliates',
    descriptionKey: 'wsext_link_sanitizer_affiliates_description',
    params: [
      'ef_id',
      's_kwcid',
      '_branch_match_id',
      '_branch_referrer',
      '_bhlid',
      'adjust_adgroup',
      'adjust_campaign',
      'adjust_creative',
      'adjust_tracker',
      'adjust_tracker_limit',
      'mkevt',
      'mkcid',
      'mkrid',
      'campid',
      'toolid',
      'customid',
      'rtid',
      'irclickid',
      'ir_adid',
      'ir_campaignid',
      'ir_partnerid',
      'gdfms',
      'gdftrk',
      'gdffi',
      'redirect_log_mongo_id',
      'redirect_mongo_id',
      'sb_referer_host',
      'mkwid',
      'pcrid',
      'tw_source',
      'tw_campaign',
      'tw_term',
      'tw_content',
      'tw_adid',
      'klar_source',
      'klar_cpid',
      'klar_adid',
      'os_ehash',
      'wt_mc',
      'wtrid',
      'tracking_source',
      'ceneo_spo',
      'rb_clickid',
      's_cid',
      'vn_',
      '_trksid',
      'athena',
      'athAsset',
      'content_source',
    ],
  },
}

export const DEFAULT_LINK_SANITIZER_ENABLED_GROUPS: LinkSanitizerGroupId[] = [
  ...LINK_SANITIZER_GROUP_IDS,
]

export const normalizeParamsList = (params: string[] = []): string[] => {
  if (!Array.isArray(params)) {
    return []
  }

  return Array.from(
    new Set(
      params
        .map(param => String(param).trim())
        .filter(Boolean),
    ),
  )
}

export const parseCustomParamsText = (value: string): string[] => {
  return normalizeParamsList(value.split(','))
}

export const getLinkSanitizerRemoveParams = (
  enabledGroups: LinkSanitizerGroupId[] = DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
  customParams: string[] = [],
): string[] => {
  const groupedParams = enabledGroups.flatMap(groupId => LINK_SANITIZER_GROUPS[groupId]?.params ?? [])
  return normalizeParamsList([...groupedParams, ...customParams])
}

export const getLinkSanitizerRemoveParamsFromState = (linkSanitizer?: {
  enabledGroups?: LinkSanitizerGroupId[]
  customParams?: string[]
}): string[] => {
  return getLinkSanitizerRemoveParams(
    linkSanitizer?.enabledGroups ?? DEFAULT_LINK_SANITIZER_ENABLED_GROUPS,
    linkSanitizer?.customParams ?? [],
  )
}
