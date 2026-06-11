import { supabase } from "@/lib/supabase";
import type { Player, Position } from "@/store/useTacticsStore";

export function formatPlayers(rawPlayers: any[]): Player[] {
  return rawPlayers.map((player) => {
    let imageUrl = null;
    let headshotUrl = null;

    if (player.image_path) {
      imageUrl = supabase.storage
        .from("player-images")
        .getPublicUrl(player.image_path).data.publicUrl;
    }

    if (player.headshot_path) {
      headshotUrl = supabase.storage
        .from("player-images")
        .getPublicUrl(player.headshot_path).data.publicUrl;
    }

    return {
      id: player.id,
      name: player.name,
      position: player.position as Position,
      category: player.category,
      jersey_number: player.jersey_number,
      image_url: imageUrl,
      headshot_url: headshotUrl,
      is_starter: player.is_starter,
      rating: player.rating,
      default_x: player.default_x,
      default_y: player.default_y,
    };
  });
}
