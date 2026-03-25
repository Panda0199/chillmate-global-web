import { useEffect, useState } from "react";
import {
  getSiteContent,
  PageSection,
  SiteSettings,
  updateSectionTranslation,
} from "@/lib/content";

const CMS = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editedSections, setEditedSections] = useState<Record<string, any>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { settings, sections } = await getSiteContent("en");
        setSettings(settings);
        setSections(sections);

        const initialEdits: Record<string, any> = {};
        sections.forEach((section) => {
          initialEdits[section.id] = {
            title: section.translation?.title || "",
            subtitle: section.translation?.subtitle || "",
            body: section.translation?.body || "",
            button_label: section.translation?.button_label || "",
            items: section.translation?.items || [],
            form_config: section.translation?.form_config || {},
          };
        });

        setEditedSections(initialEdits);
      } catch (error) {
        console.error("Failed to load CMS content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleFieldChange = (sectionId: string, field: string, value: string) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (sectionId: string) => {
    try {
      setSavingId(sectionId);
      await updateSectionTranslation(sectionId, "en", editedSections[sectionId]);

      const { settings, sections } = await getSiteContent("en");
      setSettings(settings);
      setSections(sections);
    } catch (error) {
      console.error("Failed to save section:", error);
      alert("Failed to save section.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading CMS...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-10">
        <h1 className="text-3xl font-semibold mb-2">ClearContent CMS</h1>
        <p className="text-muted-foreground mb-8">
          Manage website sections and content.
        </p>

        <div className="mb-8 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Team slug:</strong> {settings?.team_slug}</p>
            <p><strong>Site name:</strong> {settings?.site_name}</p>
            <p><strong>Default language:</strong> {settings?.default_language}</p>
            <p><strong>Enabled languages:</strong> {settings?.enabled_languages?.join(", ")}</p>
            <p><strong>Page title:</strong> {settings?.page_title}</p>
            <p><strong>Meta description:</strong> {settings?.meta_description}</p>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold capitalize">
                  {section.section_key}
                </h2>
                <span className="text-sm text-muted-foreground">
                  Visible: {section.is_visible ? "Yes" : "No"}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <p><strong>Sort order:</strong> {section.sort_order}</p>
                <p><strong>Background type:</strong> {section.background_type}</p>
                <p><strong>Background value:</strong> {section.background_value || "-"}</p>
                <p><strong>Alignment:</strong> {section.alignment || "-"}</p>

                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={editedSections[section.id]?.title || ""}
                    onChange={(e) =>
                      handleFieldChange(section.id, "title", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editedSections[section.id]?.subtitle || ""}
                    onChange={(e) =>
                      handleFieldChange(section.id, "subtitle", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Body</label>
                  <textarea
                    value={editedSections[section.id]?.body || ""}
                    onChange={(e) =>
                      handleFieldChange(section.id, "body", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 bg-background min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Button label</label>
                  <input
                    type="text"
                    value={editedSections[section.id]?.button_label || ""}
                    onChange={(e) =>
                      handleFieldChange(section.id, "button_label", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 bg-background"
                  />
                </div>

                <button
                  onClick={() => handleSave(section.id)}
                  disabled={savingId === section.id}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                  {savingId === section.id ? "Saving..." : "Save Section"}
                </button>
              </div>

              {Array.isArray(section.translation?.items) && (
                <div className="mt-4">
                  <h3 className="font-medium mb-3">Items</h3>
                  <div className="space-y-4">
                    {(editedSections[section.id]?.items ||
                      section.translation?.items ||
                      []).map((item: any, index: number) => (
                      <div key={index} className="rounded-md border p-3 space-y-3">
                        <div>
                          <label className="block font-medium mb-1">
                            Item Title
                          </label>
                          <input
                            type="text"
                            value={
                              (editedSections[section.id]?.items ||
                                section.translation?.items ||
                                [])[index]?.title || ""
                            }
                            onChange={(e) => {
                              const currentItems = [
                                ...(editedSections[section.id]?.items ||
                                  section.translation?.items ||
                                  []),
                              ];
                              currentItems[index] = {
                                ...currentItems[index],
                                title: e.target.value,
                              };
                              setEditedSections((prev) => ({
                                ...prev,
                                [section.id]: {
                                  ...prev[section.id],
                                  items: currentItems,
                                },
                              }));
                            }}
                            className="w-full rounded-md border px-3 py-2 bg-background"
                          />
                        </div>

                        <div>
                          <label className="block font-medium mb-1">
                            Item Description
                          </label>
                          <textarea
                            value={
                              (editedSections[section.id]?.items ||
                                section.translation?.items ||
                                [])[index]?.desc || ""
                            }
                            onChange={(e) => {
                              const currentItems = [
                                ...(editedSections[section.id]?.items ||
                                  section.translation?.items ||
                                  []),
                              ];
                              currentItems[index] = {
                                ...currentItems[index],
                                desc: e.target.value,
                              };
                              setEditedSections((prev) => ({
                                ...prev,
                                [section.id]: {
                                  ...prev[section.id],
                                  items: currentItems,
                                },
                              }));
                            }}
                            className="w-full rounded-md border px-3 py-2 bg-background min-h-[80px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.translation?.form_config && (
                <div className="mt-4 space-y-4">
                  <h3 className="font-medium mb-2">Form Config</h3>

                  <div>
                    <label className="block font-medium mb-1">
                      Success Message
                    </label>
                    <textarea
                      value={
                        editedSections[section.id]?.form_config?.successMessage || ""
                      }
                      onChange={(e) => {
                        setEditedSections((prev) => ({
                          ...prev,
                          [section.id]: {
                            ...prev[section.id],
                            form_config: {
                              ...prev[section.id]?.form_config,
                              successMessage: e.target.value,
                            },
                          },
                        }));
                      }}
                      className="w-full rounded-md border px-3 py-2 bg-background min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                      Consent Label
                    </label>
                    <textarea
                      value={
                        editedSections[section.id]?.form_config?.consentLabel || ""
                      }
                      onChange={(e) => {
                        setEditedSections((prev) => ({
                          ...prev,
                          [section.id]: {
                            ...prev[section.id],
                            form_config: {
                              ...prev[section.id]?.form_config,
                              consentLabel: e.target.value,
                            },
                          },
                        }));
                      }}
                      className="w-full rounded-md border px-3 py-2 bg-background min-h-[80px]"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMS;