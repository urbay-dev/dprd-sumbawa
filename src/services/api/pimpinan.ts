import { BASE_URL } from './config';

export interface Pimpinan {
  id: string;
  name: string;
  position: string;
  faction: string | null;
  period: string;
  imageUrl: string | null;
  bio: string | null;
  order: number;
  createdAt: string;
}

export async function fetchPimpinan(): Promise<Pimpinan[]> {
  const res = await fetch(`${BASE_URL}/pimpinan`);
  if (!res.ok) return [];
  return res.json();
}

export async function createPimpinan(formData: FormData, token: string): Promise<Pimpinan> {
  const res = await fetch(`${BASE_URL}/pimpinan`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal membuat data pimpinan');
  }
  return res.json();
}

export async function updatePimpinan(id: string, formData: FormData, token: string): Promise<Pimpinan> {
  const res = await fetch(`${BASE_URL}/pimpinan/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal update pimpinan');
  }
  return res.json();
}

export async function deletePimpinan(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/pimpinan/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal hapus pimpinan');
  }
}
