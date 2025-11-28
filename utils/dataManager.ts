import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Project, Service, Skill } from '../types';

// ==========================================
// ⚙️ إعدادات جوجل شيت
// ==========================================

export const SHEET_URLS = {
  // 1. رابط صفحة الأعمال (Portfolio) - الغلاف والمعلومات الأساسية
  portfolio: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDdAWa4YXmJv6iUrMrBcuasYNZaR6snt5S1tjzKN2vZdp5IRfK8OBPOxX1_77v4FY4gQRpXwNgRXk-/pub?gid=0&single=true&output=csv", 

  // 2. رابط صفحة الخدمات (Services)
  services: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDdAWa4YXmJv6iUrMrBcuasYNZaR6snt5S1tjzKN2vZdp5IRfK8OBPOxX1_77v4FY4gQRpXwNgRXk-/pub?gid=1957885723&single=true&output=csv",

  // 3. رابط صفحة المهارات (Skills)
  skills: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDdAWa4YXmJv6iUrMrBcuasYNZaR6snt5S1tjzKN2vZdp5IRfK8OBPOxX1_77v4FY4gQRpXwNgRXk-/pub?gid=958727607&single=true&output=csv"
};

// ==========================================
// 📦 البيانات الافتراضية
// تم تفريغها لضمان ظهور بيانات الشيت فقط
// ==========================================

export const DEFAULT_PROJECTS: Project[] = [];

export const DEFAULT_SERVICES: Service[] = [];

export const DEFAULT_SKILLS: Skill[] = [];

// ==========================================
// 🛠️ Hook to Fetch Data
// ==========================================

export function useSheetData<T>(url: string, defaultData: T[]): T[] {
  const [data, setData] = useState<T[]>(defaultData);

  useEffect(() => {
    if (!url) return;

    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(), // Remove extra spaces from column names
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          // Clean data: convert strings to numbers where necessary
          const cleanedData = results.data.map((item: any) => {
             const newItem = { ...item };
             // Convert 'id' and 'level' to numbers if they exist
             if (newItem.id) newItem.id = Number(newItem.id);
             if (newItem.level) newItem.level = Number(newItem.level);
             return newItem;
          });
          // console.log(`Loaded data for ${url}:`, cleanedData); // Debugging
          setData(cleanedData as T[]);
        }
      },
      error: (err) => {
        console.error("Error fetching CSV:", err);
      }
    });
  }, [url]);

  return data;
}