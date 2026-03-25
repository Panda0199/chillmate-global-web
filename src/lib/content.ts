import { supabase } from "./supabase";

export type SiteSettings = {
  team_slug: string;
  site_name: string;
  default_language: string;
  enabled_languages: string[];
  page_title: string;
  meta_description: string;
};

export type SectionTranslation = {
  title: string | null;
  subtitle: string | null;
  body: string | null;
  button_label: string | null;
  items: any;
  form_config: any;
};

export type PageSection = {
  id: string;
  section_key: string;
  is_visible: boolean;
  sort_order: number;
  background_type: string;
  background_value: string | null;
  spacing_top: string | null;
  spacing_bottom: string | null;
  alignment: string | null;
  translation?: SectionTranslation | null;
};

export async function getSiteContent(language = "en") {
  const { data: settings, error: settingsError } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (settingsError) throw settingsError;

  const { data: sections, error: sectionsError } = await supabase
    .from("page_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (sectionsError) throw sectionsError;

  const sectionIds = (sections || []).map((s) => s.id);

  const { data: translations, error: translationsError } = await supabase
    .from("section_translations")
    .select("*")
    .eq("language_code", language)
    .in("section_id", sectionIds);

  if (translationsError) throw translationsError;

  const translationMap = new Map(
    (translations || []).map((t) => [t.section_id, t])
  );

  return {
    settings: settings as SiteSettings,
    sections: (sections || []).map((section) => ({
      ...section,
      translation: translationMap.get(section.id) || null,
    })) as PageSection[],
  };
}
export async function updateSectionTranslation(
    sectionId: string,
    languageCode: string,
    updates: {
      title?: string | null;
      subtitle?: string | null;
      body?: string | null;
      button_label?: string | null;
      items?: any;
      form_config?: any;
    }
  ) {
    const { data, error } = await supabase
      .from("section_translations")
      .update(updates)
      .eq("section_id", sectionId)
      .eq("language_code", languageCode)
      .select()
      .single();
  
    if (error) throw error;
    return data;
  }