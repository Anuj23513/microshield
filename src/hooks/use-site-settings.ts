import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data.forEach((s: any) => { map[s.key] = s.value || ""; });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useContactInfo() {
  const { data: settings = {} } = useSiteSettings();
  return {
    address: settings.address || "323 Ground Floor, Bankey Lal Market, Badarpur, New Delhi, Delhi 110044",
    whatsapp: settings.whatsapp || "7289999300",
    email: settings.email || "info@eitc.co.in",
  };
}
