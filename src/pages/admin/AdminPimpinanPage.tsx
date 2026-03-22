import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, X, Upload, User } from 'lucide-react';
import { fetchPimpinan, createPimpinan, updatePimpinan, deletePimpinan } from '../../services/api';
import type { Pimpinan } from '../../services/api';
import AdminLayout from './AdminLayout';

const emptyForm = {
    name: '',
    position: '',
    faction: '',
    period: '2024-2029',
    bio: '',
    order: '0',
};

const AdminPimpinanPage: React.FC = () => {
    const [pimpinan, setPimpinan] = useState<Pimpinan[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<Pimpinan | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const token = localStorage.getItem('admin_token') || '';

    const loadData = useCallback(async () => {
        setLoading(true);
        const data = await fetchPimpinan();
        setPimpinan(data);
        setLoading(false);
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    const openCreate = () => {
        setEditItem(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview('');
        setError('');
        setShowModal(true);
    };

    const openEdit = (item: Pimpinan) => {
        setEditItem(item);
        setForm({
            name: item.name,
            position: item.position,
            faction: item.faction || '',
            period: item.period,
            bio: item.bio || '',
            order: String(item.order),
        });
        setImageFile(null);
        setImagePreview(item.imageUrl || '');
        setError('');
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!form.name.trim()) { setError('Nama diperlukan'); return; }
        if (!form.position.trim()) { setError('Jabatan diperlukan'); return; }
        setSaving(true);
        setError('');
        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('position', form.position);
            fd.append('faction', form.faction);
            fd.append('period', form.period);
            fd.append('bio', form.bio);
            fd.append('order', form.order);
            if (imageFile) fd.append('image', imageFile);

            if (editItem) {
                await updatePimpinan(editItem.id, fd, token);
            } else {
                await createPimpinan(fd, token);
            }
            setShowModal(false);
            loadData();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Gagal menyimpan');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deletePimpinan(deleteId, token);
        setDeleteId(null);
        loadData();
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Manajemen Pimpinan</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola data <span className="font-bold text-primary">{pimpinan.length}</span> pimpinan dan profil mereka</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-gradient-to-r from-[#0a2744] to-[#123b66] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all">
                    <Plus size={18} strokeWidth={2.5} /> Tambah Pimpinan
                </button>
            </div>

            {/* Cards Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm h-56 animate-pulse" />
                    ))}
                </div>
            ) : pimpinan.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                    <User size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400">Belum ada data pimpinan. Tambah pimpinan pertama!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pimpinan.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden group flex flex-col">
                            <div className="relative h-56 overflow-hidden shrink-0 bg-slate-100">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                        <User size={48} className="text-slate-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    {item.faction && (
                                        <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md mb-2 shadow-sm">
                                            {item.faction}
                                        </span>
                                    )}
                                    <p className="text-white font-black text-base leading-tight drop-shadow-md">{item.name}</p>
                                    <p className="text-blue-200 font-medium text-xs mt-1 drop-shadow-md">{item.position}</p>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
                                    #{item.order}
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                                            Periode {item.period}
                                        </span>
                                    </div>
                                    {item.bio ? (
                                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{item.bio}</p>
                                    ) : (
                                        <p className="text-slate-400/50 italic text-xs">Belum ada bio/deskripsi.</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <button onClick={() => openEdit(item)} className="px-3 py-1.5 hover:bg-blue-50 bg-white border border-blue-100 rounded-lg text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-bold">
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button onClick={() => setDeleteId(item.id)} className="px-3 py-1.5 hover:bg-red-50 bg-white border border-red-100 rounded-lg text-red-500 transition-colors flex items-center gap-1.5 text-xs font-bold">
                                        <Trash2 size={14} /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="font-bold text-gray-800">{editItem ? 'Edit Pimpinan' : 'Tambah Pimpinan'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5 space-y-4">
                            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">{error}</div>}

                            {/* Photo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto</label>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-20 h-24 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-gray-50"
                                        onClick={() => document.getElementById('pimpinan-image-input')?.click()}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="" className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <div className="text-center p-2">
                                                <Upload size={16} className="mx-auto text-gray-300 mb-1" />
                                                <p className="text-gray-300 text-xs">Pilih foto</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-gray-500 text-xs leading-relaxed">
                                        <p>Klik kotak untuk pilih foto.</p>
                                        <p>Disarankan foto portrait,</p>
                                        <p>format JPG/PNG, max 5MB.</p>
                                    </div>
                                </div>
                                <input id="pimpinan-image-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        placeholder="H. Nama Lengkap, S.H." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Jabatan *</label>
                                    <input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        placeholder="Ketua DPRD" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Fraksi</label>
                                    <input type="text" value={form.faction} onChange={e => setForm({ ...form, faction: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        placeholder="Fraksi Gerindra" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Periode</label>
                                    <input type="text" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        placeholder="2024-2029" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Urutan</label>
                                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        min="0" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / Deskripsi</label>
                                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                                    rows={3} placeholder="Deskripsi singkat pimpinan..." />
                            </div>
                        </div>

                        <div className="flex gap-3 p-5 border-t border-gray-100">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                Batal
                            </button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
                                {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <h3 className="font-bold text-gray-800 mb-2">Hapus Pimpinan?</h3>
                        <p className="text-gray-500 text-sm mb-5">Data dan foto pimpinan akan dihapus permanen.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Batal</button>
                            <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600">Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminPimpinanPage;
