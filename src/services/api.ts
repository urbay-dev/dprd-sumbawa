const BASE_URL = '/api';

// ============ Auth ============
export interface AdminUser {
  id: string;
  username: string;
}

export async function loginAdmin(username: string, password: string): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login gagal');
  }
  return res.json();
}

export async function verifyToken(token: string): Promise<AdminUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Token tidak valid');
  return res.json();
}

// ============ Banner ============
export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  category: string;
  imageUrl: string;
  linkUrl: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export async function fetchBanners(isActive?: boolean): Promise<Banner[]> {
  const query = isActive !== undefined ? `?isActive=${isActive}` : '';
  const res = await fetch(`${BASE_URL}/banners${query}`);
  if (!res.ok) return [];
  return res.json();
}

export async function createBanner(formData: FormData, token: string): Promise<Banner> {
  const res = await fetch(`${BASE_URL}/banners`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal membuat banner');
  }
  return res.json();
}

export async function updateBanner(id: string, formData: FormData, token: string): Promise<Banner> {
  const res = await fetch(`${BASE_URL}/banners/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal update banner');
  }
  return res.json();
}

export async function deleteBanner(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/banners/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal hapus banner');
  }
}

// ============ Berita ============
export interface Berita {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  category: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface BeritaListResponse {
  data: Berita[];
  total: number;
  page: number;
}

export async function fetchBerita(params?: {
  limit?: number;
  page?: number;
  category?: string;
  isPublished?: boolean;
}): Promise<BeritaListResponse> {
  const query = new URLSearchParams();
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.page) query.set('page', String(params.page));
  if (params?.category) query.set('category', params.category);
  if (params?.isPublished !== undefined) query.set('isPublished', String(params.isPublished));

  const res = await fetch(`${BASE_URL}/berita?${query.toString()}`);
  if (!res.ok) return { data: [], total: 0, page: 1 };
  return res.json();
}

export async function fetchBeritaDetail(idOrSlug: string): Promise<Berita> {
  const res = await fetch(`${BASE_URL}/berita/${idOrSlug}`);
  if (!res.ok) throw new Error('Berita tidak ditemukan');
  return res.json();
}

export async function createBerita(formData: FormData, token: string): Promise<Berita> {
  const res = await fetch(`${BASE_URL}/berita`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal membuat berita');
  }
  return res.json();
}

export async function updateBerita(id: string, formData: FormData, token: string): Promise<Berita> {
  const res = await fetch(`${BASE_URL}/berita/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal update berita');
  }
  return res.json();
}

export async function deleteBerita(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/berita/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal hapus berita');
  }
}

// ============ Pimpinan ============
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

// ============ Admin Management ============
export async function fetchAdmins(token: string): Promise<AdminUser[]> {
  const res = await fetch(`${BASE_URL}/admins`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function createAdmin(data: { username: string; password?: string }, token: string): Promise<AdminUser> {
  const res = await fetch(`${BASE_URL}/admins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal membuat admin');
  }
  return res.json();
}

export async function updateAdmin(id: string, data: { username: string; password?: string }, token: string): Promise<AdminUser> {
  const res = await fetch(`${BASE_URL}/admins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal update admin');
  }
  return res.json();
}

export async function deleteAdmin(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/admins/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal hapus admin');
  }
}
