import { supabase } from "./supabase";

export const getAll = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

export const addContent = async (content, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert({ content: content, time: parseFloat(time) });

  if (error) {
    console.error("Error adding content", error);
    throw error;
  }

  return data;
};

export const deleteContent = async (id) => {
  await supabase.from("study-record").delete().eq("id", id).select();
};
