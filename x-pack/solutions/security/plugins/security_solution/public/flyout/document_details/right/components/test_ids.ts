/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { PREFIX } from '../../../shared/test_ids';
import { CONTENT_TEST_ID, HEADER_TEST_ID } from './expandable_section';

/* Table */

const FLYOUT_TABLE_TEST_ID = `${PREFIX}Table` as const;
export const FLYOUT_TABLE_FIELD_NAME_CELL_ICON_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}FieldNameCellIcon` as const;
export const FLYOUT_TABLE_FIELD_NAME_CELL_TEXT_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}FieldNameCellText` as const;
export const FLYOUT_TABLE_PREVIEW_LINK_FIELD_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}PreviewLinkField` as const;
export const FLYOUT_TABLE_PIN_ACTION_TEST_ID = `${FLYOUT_TABLE_TEST_ID}PinAction` as const;
export const TABLE_TAB_SETTING_BUTTON_TEST_ID = `${PREFIX}TableTabSettingButton` as const;
export const TABLE_TAB_SETTING_HIGHLIGHTED_FIELDS_ONLY_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}HighlightedFieldsOnly` as const;
export const TABLE_TAB_SETTING_HIDE_EMPTY_FIELDS_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}HideEmptyFields` as const;
export const TABLE_TAB_SETTING_HIDE_ALERT_FIELDS_TEST_ID =
  `${FLYOUT_TABLE_TEST_ID}HideAlertFields` as const;
export const TABLE_TAB_TOUR_TEST_ID = `${FLYOUT_TABLE_TEST_ID}Tour` as const;

/* Header */

const FLYOUT_HEADER_TEST_ID = `${PREFIX}Header` as const;
export const FLYOUT_ALERT_HEADER_TITLE_TEST_ID = `${PREFIX}AlertTitle` as const;
export const FLYOUT_EVENT_HEADER_TITLE_TEST_ID = `${PREFIX}EventTitle` as const;

export const ALERT_SUMMARY_PANEL_TEST_ID = `${FLYOUT_HEADER_TEST_ID}AlertSumaryPanel` as const;
export const STATUS_TITLE_TEST_ID = `${FLYOUT_HEADER_TEST_ID}StatusTitle` as const;
export const STATUS_BUTTON_TEST_ID = 'rule-status-badge' as const;
export const SEVERITY_VALUE_TEST_ID = 'severity' as const;
export const RISK_SCORE_TITLE_TEST_ID = `${FLYOUT_HEADER_TEST_ID}RiskScoreTitle` as const;
export const RISK_SCORE_VALUE_TEST_ID = `${FLYOUT_HEADER_TEST_ID}RiskScoreValue` as const;
export const SHARE_BUTTON_TEST_ID = `${FLYOUT_HEADER_TEST_ID}ShareButton` as const;
export const CHAT_BUTTON_TEST_ID = 'newChatByTitle' as const;

export const NOTES_TITLE_TEST_ID = `${FLYOUT_HEADER_TEST_ID}NotesTitle` as const;
export const NOTES_ADD_NOTE_BUTTON_TEST_ID = `${FLYOUT_HEADER_TEST_ID}NotesAddNoteButton` as const;
export const NOTES_VIEW_NOTES_BUTTON_TEST_ID =
  `${FLYOUT_HEADER_TEST_ID}NotesViewNotesButton` as const;
export const NOTES_ADD_NOTE_ICON_BUTTON_TEST_ID =
  `${FLYOUT_HEADER_TEST_ID}NotesAddNoteIconButton` as const;
export const NOTES_COUNT_TEST_ID = `${FLYOUT_HEADER_TEST_ID}NotesCount` as const;
export const NOTES_LOADING_TEST_ID = `${FLYOUT_HEADER_TEST_ID}NotesLoading` as const;

export const ASSIGNEES_EMPTY_TEST_ID = `${FLYOUT_HEADER_TEST_ID}AssigneesEmpty` as const;
export const ASSIGNEES_TEST_ID = `${FLYOUT_HEADER_TEST_ID}Assignees` as const;
export const ASSIGNEES_TITLE_TEST_ID = `${FLYOUT_HEADER_TEST_ID}AssigneesTitle` as const;
export const ASSIGNEES_ADD_BUTTON_TEST_ID = `${FLYOUT_HEADER_TEST_ID}AssigneesAddButton` as const;

/* About section */

export const ABOUT_SECTION_TEST_ID = `${PREFIX}AboutSection` as const;
export const ABOUT_SECTION_HEADER_TEST_ID = ABOUT_SECTION_TEST_ID + HEADER_TEST_ID;
export const ABOUT_SECTION_CONTENT_TEST_ID = ABOUT_SECTION_TEST_ID + CONTENT_TEST_ID;

export const RULE_SUMMARY_BUTTON_TEST_ID = `${PREFIX}RuleSummaryButton` as const;
const ALERT_DESCRIPTION_TEST_ID = `${PREFIX}AlertDescription` as const;
export const ALERT_DESCRIPTION_TITLE_TEST_ID = `${ALERT_DESCRIPTION_TEST_ID}Title` as const;
export const ALERT_DESCRIPTION_DETAILS_TEST_ID = `${ALERT_DESCRIPTION_TEST_ID}Details` as const;

export const EVENT_CATEGORY_DESCRIPTION_TEST_ID = `${PREFIX}EventCategoryDescription` as const;
export const EVENT_KIND_DESCRIPTION_TEST_ID = `${PREFIX}EventKindDescription` as const;
export const EVENT_KIND_DESCRIPTION_TEXT_TEST_ID = `${EVENT_KIND_DESCRIPTION_TEST_ID}Text` as const;
export const EVENT_KIND_DESCRIPTION_CATEGORIES_TEST_ID =
  `${EVENT_KIND_DESCRIPTION_TEST_ID}Categories` as const;

const REASON_TEST_ID = `${PREFIX}Reason` as const;
export const REASON_TITLE_TEST_ID = `${REASON_TEST_ID}Title` as const;
export const REASON_DETAILS_TEST_ID = `${REASON_TEST_ID}Details` as const;
export const REASON_DETAILS_PREVIEW_BUTTON_TEST_ID = `${REASON_TEST_ID}PreviewButton` as const;

const MITRE_ATTACK_TEST_ID = `${PREFIX}MitreAttack` as const;
export const MITRE_ATTACK_TITLE_TEST_ID = `${MITRE_ATTACK_TEST_ID}Title` as const;
export const MITRE_ATTACK_DETAILS_TEST_ID = `${MITRE_ATTACK_TEST_ID}Details` as const;

export const EVENT_RENDERER_TEST_ID = `${PREFIX}EventRenderer` as const;

export const WORKFLOW_STATUS_TEST_ID = `${PREFIX}WorkflowStatus` as const;
export const WORKFLOW_STATUS_TITLE_TEST_ID = `${WORKFLOW_STATUS_TEST_ID}Title` as const;
export const WORKFLOW_STATUS_DETAILS_TEST_ID = `${WORKFLOW_STATUS_TEST_ID}Details` as const;

/* Investigation section */

export const INVESTIGATION_SECTION_TEST_ID = `${PREFIX}InvestigationSection` as const;
export const INVESTIGATION_SECTION_HEADER_TEST_ID = INVESTIGATION_SECTION_TEST_ID + HEADER_TEST_ID;
export const INVESTIGATION_SECTION_CONTENT_TEST_ID =
  INVESTIGATION_SECTION_TEST_ID + CONTENT_TEST_ID;

export const INVESTIGATION_GUIDE_TEST_ID = `${PREFIX}InvestigationGuide` as const;
export const INVESTIGATION_GUIDE_BUTTON_TEST_ID = `${INVESTIGATION_GUIDE_TEST_ID}Button` as const;
export const INVESTIGATION_GUIDE_LOADING_TEST_ID = `${INVESTIGATION_GUIDE_TEST_ID}Loading` as const;

const HIGHLIGHTED_FIELDS_TEST_ID = `${PREFIX}HighlightedFields` as const;
export const HIGHLIGHTED_FIELDS_TITLE_TEST_ID = `${HIGHLIGHTED_FIELDS_TEST_ID}Title` as const;
export const HIGHLIGHTED_FIELDS_DETAILS_TEST_ID = `${HIGHLIGHTED_FIELDS_TEST_ID}Details` as const;
export const HIGHLIGHTED_FIELDS_CELL_TEST_ID = `${HIGHLIGHTED_FIELDS_TEST_ID}Cell` as const;
export const HIGHLIGHTED_FIELDS_BASIC_CELL_TEST_ID =
  `${HIGHLIGHTED_FIELDS_TEST_ID}BasicCell` as const;
export const HIGHLIGHTED_FIELDS_LINKED_CELL_TEST_ID =
  `${HIGHLIGHTED_FIELDS_TEST_ID}LinkedCell` as const;
export const HIGHLIGHTED_FIELDS_AGENT_STATUS_CELL_TEST_ID =
  `${HIGHLIGHTED_FIELDS_TEST_ID}AgentStatusCell` as const;

export const HIGHLIGHTED_FIELDS_EDIT_BUTTON_TEST_ID =
  `${HIGHLIGHTED_FIELDS_TEST_ID}EditButton` as const;
export const HIGHLIGHTED_FIELDS_EDIT_BUTTON_LOADING_TEST_ID =
  `${HIGHLIGHTED_FIELDS_EDIT_BUTTON_TEST_ID}Loading` as const;
export const HIGHLIGHTED_FIELDS_EDIT_BUTTON_TOOLTIP_TEST_ID =
  `${HIGHLIGHTED_FIELDS_EDIT_BUTTON_TEST_ID}Tooltip` as const;
export const HIGHLIGHTED_FIELDS_MODAL_TEST_ID = `${HIGHLIGHTED_FIELDS_TEST_ID}Modal` as const;
export const HIGHLIGHTED_FIELDS_MODAL_TITLE_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}Title` as const;
export const HIGHLIGHTED_FIELDS_MODAL_DESCRIPTION_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}Description` as const;
export const HIGHLIGHTED_FIELDS_MODAL_DEFAULT_FIELDS_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}DefaultFields` as const;
export const HIGHLIGHTED_FIELDS_MODAL_CUSTOM_FIELDS_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}CustomFields` as const;
export const HIGHLIGHTED_FIELDS_MODAL_SAVE_BUTTON_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}SaveButton` as const;
export const HIGHLIGHTED_FIELDS_MODAL_CANCEL_BUTTON_TEST_ID =
  `${HIGHLIGHTED_FIELDS_MODAL_TEST_ID}CancelButton` as const;

/* Insights section */

export const INSIGHTS_TEST_ID = `${PREFIX}Insights` as const;
export const INSIGHTS_HEADER_TEST_ID = INSIGHTS_TEST_ID + HEADER_TEST_ID;
export const INSIGHTS_CONTENT_TEST_ID = INSIGHTS_TEST_ID + CONTENT_TEST_ID;

/* Summary row */

export const SUMMARY_ROW_LOADING_TEST_ID = (dataTestSubj: string) => `${dataTestSubj}Loading`;
export const SUMMARY_ROW_TEXT_TEST_ID = (dataTestSubj: string) => `${dataTestSubj}Text`;
export const SUMMARY_ROW_VALUE_TEST_ID = (dataTestSubj: string) => `${dataTestSubj}Value`;
export const SUMMARY_ROW_BUTTON_TEST_ID = (dataTestSubj: string) => `${dataTestSubj}Button`;

/* Entities */

export const INSIGHTS_ENTITIES_TEST_ID = `${PREFIX}InsightsEntities` as const;

export const ENTITIES_USER_OVERVIEW_TEST_ID = `${INSIGHTS_ENTITIES_TEST_ID}UserOverview` as const;
export const ENTITIES_USER_OVERVIEW_LOADING_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}Loading` as const;
export const ENTITIES_USER_OVERVIEW_LINK_TEST_ID = `${ENTITIES_USER_OVERVIEW_TEST_ID}Link` as const;
export const ENTITIES_USER_OVERVIEW_DOMAIN_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}Domain` as const;
export const ENTITIES_USER_OVERVIEW_LAST_SEEN_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}LastSeen` as const;
export const ENTITIES_USER_OVERVIEW_RISK_LEVEL_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}RiskLevel` as const;
export const ENTITIES_USER_OVERVIEW_ALERT_COUNT_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}AlertCount` as const;
export const ENTITIES_USER_OVERVIEW_MISCONFIGURATIONS_TEST_ID =
  `${ENTITIES_USER_OVERVIEW_TEST_ID}Misconfigurations` as const;

export const ENTITIES_HOST_OVERVIEW_TEST_ID = `${INSIGHTS_ENTITIES_TEST_ID}HostOverview` as const;
export const ENTITIES_HOST_OVERVIEW_LOADING_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}Loading` as const;
export const ENTITIES_HOST_OVERVIEW_LINK_TEST_ID = `${ENTITIES_HOST_OVERVIEW_TEST_ID}Link` as const;
export const ENTITIES_HOST_OVERVIEW_OS_FAMILY_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}OsFamily` as const;
export const ENTITIES_HOST_OVERVIEW_LAST_SEEN_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}LastSeen` as const;
export const ENTITIES_HOST_OVERVIEW_RISK_LEVEL_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}RiskLevel` as const;
export const ENTITIES_HOST_OVERVIEW_ALERT_COUNT_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}AlertCount` as const;
export const ENTITIES_HOST_OVERVIEW_MISCONFIGURATIONS_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}Misconfigurations` as const;
export const ENTITIES_HOST_OVERVIEW_VULNERABILITIES_TEST_ID =
  `${ENTITIES_HOST_OVERVIEW_TEST_ID}Vulnerabilities` as const;

/* Threat intelligence */

export const INSIGHTS_THREAT_INTELLIGENCE_TEST_ID = `${PREFIX}InsightsThreatIntelligence` as const;
export const INSIGHTS_THREAT_INTELLIGENCE_THREAT_MATCHES_TEST_ID =
  `${INSIGHTS_THREAT_INTELLIGENCE_TEST_ID}ThreatMatches` as const;
export const INSIGHTS_THREAT_INTELLIGENCE_ENRICHED_WITH_THREAT_INTELLIGENCE_TEST_ID =
  `${INSIGHTS_THREAT_INTELLIGENCE_TEST_ID}EnrichedWithThreatIntelligence` as const;

/* Correlations */

export const CORRELATIONS_TEST_ID = `${PREFIX}Correlations` as const;
export const CORRELATIONS_SUPPRESSED_ALERTS_TEST_ID =
  `${CORRELATIONS_TEST_ID}SuppressedAlerts` as const;
export const CORRELATIONS_SUPPRESSED_ALERTS_TECHNICAL_PREVIEW_TEST_ID =
  `${CORRELATIONS_SUPPRESSED_ALERTS_TEST_ID}TechnicalPreview` as const;
export const CORRELATIONS_RELATED_CASES_TEST_ID = `${CORRELATIONS_TEST_ID}RelatedCases` as const;
export const CORRELATIONS_RELATED_ALERTS_BY_SESSION_TEST_ID =
  `${CORRELATIONS_TEST_ID}RelatedAlertsBySession` as const;
export const CORRELATIONS_RELATED_ALERTS_BY_SAME_SOURCE_EVENT_TEST_ID =
  `${CORRELATIONS_TEST_ID}RelatedAlertsBySameSourceEvent` as const;
export const CORRELATIONS_RELATED_ALERTS_BY_ANCESTRY_TEST_ID =
  `${CORRELATIONS_TEST_ID}RelatedAlertsByAncestry` as const;

/* Insights Prevalence */

export const PREVALENCE_TEST_ID = `${PREFIX}InsightsPrevalence` as const;

/* Visualizations section */

export const VISUALIZATIONS_TEST_ID = `${PREFIX}Visualizations` as const;
export const VISUALIZATIONS_SECTION_HEADER_TEST_ID = VISUALIZATIONS_TEST_ID + HEADER_TEST_ID;
export const VISUALIZATIONS_SECTION_CONTENT_TEST_ID = VISUALIZATIONS_TEST_ID + CONTENT_TEST_ID;
export const ANALYZER_PREVIEW_TEST_ID = `${PREFIX}AnalyzerPreview` as const;
export const ANALYZER_PREVIEW_LOADING_TEST_ID = `${ANALYZER_PREVIEW_TEST_ID}Loading` as const;

export const SESSION_PREVIEW_TEST_ID = `${PREFIX}SessionPreview` as const;
export const SESSION_PREVIEW_RULE_DETAILS_LINK_TEST_ID =
  `${SESSION_PREVIEW_TEST_ID}RuleDetailsLink` as const;

export const GRAPH_PREVIEW_TEST_ID = `${PREFIX}GraphPreview` as const;
export const GRAPH_PREVIEW_LOADING_TEST_ID = `${GRAPH_PREVIEW_TEST_ID}Loading` as const;

/* Response section */

const RESPONSE_TEST_ID = `${PREFIX}Response` as const;
export const RESPONSE_SECTION_TEST_ID = `${RESPONSE_TEST_ID}Section` as const;
export const RESPONSE_SECTION_HEADER_TEST_ID = RESPONSE_SECTION_TEST_ID + HEADER_TEST_ID;
export const RESPONSE_SECTION_CONTENT_TEST_ID = RESPONSE_SECTION_TEST_ID + CONTENT_TEST_ID;
export const RESPONSE_BUTTON_TEST_ID = `${RESPONSE_TEST_ID}Button` as const;
export const RESPONSE_EMPTY_TEST_ID = `${RESPONSE_TEST_ID}Empty` as const;
