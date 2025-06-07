"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, ViewGridIcon, ViewListIcon, CalendarIcon, UserIcon, TagIcon, TrendingUpIcon, ClockIcon } from "@heroicons/react/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced news data with categories
const categories = [
    { id: "all", name: "Semua Berita", count: 24 },
    { id: "akademik", name: "Akademik", count: 8 },
    { id: "penelitian", name: "Penelitian", count: 6 },
    { id: "kemahasiswaan", name: "Kemahasiswaan", count: 5 },
    { id: "pengabdian", name: "Pengabdian Masyarakat", count: 3 },
    { id: "kerjasama", name: "Kerjasama", count: 2 },
];

const featuredNews = [
    {
        id: 1,
        title: "Kulit Buah Naga Jadi Camilan Sehat, Kolaborasi Unpak dan Filipina di Kebun Merdesa",
        excerpt:
            "Dosen dan mahasiswa FMIPA Universitas Pakuan (Unpak) dalam program Pengabdian kepada Masyarakat (PKM) Internasional yang berlangsung di Kebun Merdesa, Bogor.",
        date: "21 April 2025",
        author: "Tim Humas Unpak",
        category: "pengabdian",
        categoryName: "Pengabdian Masyarakat",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        slug: "kulit-buah-naga-camilan-sehat",
        readTime: "5 min",
        views: "1.2k",
    },
    {
        id: 2,
        title: "Breakthrough Penelitian AI untuk Deteksi Dini Penyakit Tanaman",
        excerpt: "Tim peneliti Fakultas Teknik Unpak berhasil mengembangkan sistem AI yang dapat mendeteksi penyakit tanaman dengan akurasi 95%.",
        date: "20 April 2025",
        author: "Dr. Ahmad Fauzi",
        category: "penelitian",
        categoryName: "Penelitian",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        slug: "ai-deteksi-penyakit-tanaman",
        readTime: "7 min",
        views: "2.1k",
    },
];

const allNews = [
    {
        id: 3,
        title: "Universitas Pakuan Gelar Halal bi Halal, Rektor: Satukan Hati, Kuatkan Ukhuwah",
        excerpt: "Acara halal bi halal dihadiri seluruh civitas akademika sebagai momentum mempererat silaturahmi.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        date: "19 April 2025",
        author: "Humas Unpak",
        category: "kemahasiswaan",
        categoryName: "Kemahasiswaan",
        slug: "halal-bi-halal-unpak-2025",
        readTime: "3 min",
        views: "856",
    },
    {
        id: 4,
        title: "Konferensi Kepemimpinan Mahasiswa: Membangun Gerakan Bersatu untuk Perubahan",
        excerpt: "Mahasiswa dari berbagai fakultas berkumpul membahas strategi kepemimpinan masa depan.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        date: "18 April 2025",
        author: "BEM Unpak",
        category: "kemahasiswaan",
        categoryName: "Kemahasiswaan",
        slug: "konferensi-kepemimpinan-mahasiswa",
        readTime: "4 min",
        views: "1.1k",
    },
    {
        id: 5,
        title: "Transformasi Digital UMKM Desa: Tingkatkan Daya Saing dengan SEO dan Marketing",
        excerpt: "Program pelatihan digital marketing untuk UMKM di wilayah Bogor dan sekitarnya.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        date: "17 April 2025",
        author: "Tim PKM",
        category: "pengabdian",
        categoryName: "Pengabdian Masyarakat",
        slug: "transformasi-digital-umkm",
        readTime: "6 min",
        views: "743",
    },
    {
        id: 6,
        title: "Inovasi SAVERIS: Solusi QR Code untuk Distribusi Bantuan Sosial",
        excerpt: "Mahasiswa Unpak ciptakan aplikasi inovatif untuk transparansi bantuan sosial.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
        date: "16 April 2025",
        author: "Fakultas Teknik",
        category: "akademik",
        categoryName: "Akademik",
        slug: "inovasi-saveris-qr-code",
        readTime: "5 min",
        views: "1.3k",
    },
];

const trendingNews = [
    { id: 1, title: "Unpak Raih Akreditasi A untuk 5 Program Studi", views: "3.2k" },
    { id: 2, title: "Mahasiswa Unpak Juara Kompetisi Nasional Robotika", views: "2.8k" },
    { id: 3, title: "Kerjasama Internasional dengan Universitas Malaysia", views: "2.1k" },
];

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNews = allNews.filter(news => {
        const matchesCategory = selectedCategory === "all" || news.category === selectedCategory;
        const matchesSearch =
            news.title.toLowerCase().includes(searchQuery.toLowerCase()) || news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="text-white bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Portal Berita Unpak</h1>
                        <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
                            Temukan berita terkini, penelitian terbaru, dan pencapaian civitas akademika Universitas Pakuan
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <SearchIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                            <Input
                                type="text"
                                placeholder="Cari berita, penelitian, atau topik..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="py-3 pl-12 pr-4 text-lg text-gray-900 bg-white border-0 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured News Carousel */}
                        <div className="mb-12">
                            <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-900">
                                <TrendingUpIcon className="w-6 h-6 mr-2 text-blue-600" />
                                Berita Utama
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {featuredNews.map(news => (
                                    <Card key={news.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                                        <div className="relative h-42">
                                            <img src={news.image || "/placeholder.svg"} alt={news.title} className="object-cover" />
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="secondary">{news.categoryName}</Badge>
                                            </div>
                                        </div>
                                        <CardContent className="">
                                            <div className="flex items-center mt-4 mb-3 text-sm text-gray-500">
                                                <CalendarIcon className="w-4 h-4 mr-1" />
                                                <span className="mr-4">{news.date}</span>
                                                <ClockIcon className="w-4 h-4 mr-1" />
                                                <span className="mr-4">{news.readTime}</span>
                                                <span>{news.views} views</span>
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2">{news.title}</h3>
                                            <p className="mb-4 text-gray-600 line-clamp-2">{news.excerpt}</p>
                                            <Button asChild className="w-full">
                                                <Link to={`/news/${news.slug}`}>Baca Selengkapnya</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
                                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 sm:w-auto">
                                    {categories.slice(0, 6).map(category => (
                                        <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                                            {category.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>

                            <div className="flex items-center space-x-2">
                                <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                                    <ViewGridIcon className="w-4 h-4" />
                                </Button>
                                <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                                    <ViewListIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" : "space-y-6 mb-12"}>
                            {currentNews.map(news => (
                                <Card
                                    key={news.id}
                                    className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === "list" ? "flex" : ""}`}>
                                    <Link to={`/news/${news.slug}`} className={viewMode === "list" ? "flex w-full" : "space-y-5"}>
                                        <div className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-48"}`}>
                                            <img
                                                src={
                                                    news.image ||
                                                    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop"
                                                }
                                                alt={news.title}
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""} mt-4`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {news.categoryName}
                                                </Badge>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <ClockIcon className="w-3 h-3 mr-1" />
                                                    {news.readTime}
                                                </div>
                                            </div>
                                            <h3
                                                className={`font-bold text-gray-900 mb-2 ${
                                                    viewMode === "list" ? "text-lg line-clamp-2" : "line-clamp-2"
                                                }`}>
                                                {news.title}
                                            </h3>
                                            <p className={`text-gray-600 mb-3 ${viewMode === "list" ? "line-clamp-2" : "line-clamp-3"}`}>
                                                {news.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <UserIcon className="w-4 h-4 mr-1" />
                                                    <span>{news.author}</span>
                                                </div>
                                                <span>{news.date}</span>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center space-x-2">
                            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Sebelumnya
                            </Button>

                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index}
                                    variant={currentPage === index + 1 ? "default" : "outline"}
                                    onClick={() => handlePageChange(index + 1)}
                                    className="w-10 h-10">
                                    {index + 1}
                                </Button>
                            ))}

                            <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                Selanjutnya
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky space-y-8 top-8">
                            {/* Trending News */}
                            <Card>
                                <CardContent className="">
                                    <h3 className="flex items-center my-4 text-lg font-bold text-gray-900">
                                        <TrendingUpIcon className="w-5 h-5 mr-2 text-red-500" />
                                        Trending
                                    </h3>
                                    <div className="space-y-4">
                                        {trendingNews.map((news, index) => (
                                            <div key={news.id} className="flex items-start space-x-3">
                                                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <h4 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2">{news.title}</h4>
                                                    <p className="text-xs text-gray-500">{news.views} views</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Categories */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="flex items-center mb-4 text-lg font-bold text-gray-900">
                                        <TagIcon className="w-5 h-5 mr-2 text-blue-500" />
                                        Kategori
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                                    selectedCategory === category.id
                                                        ? "bg-blue-100 text-blue-700 font-medium"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                }`}>
                                                <div className="flex items-center justify-between">
                                                    <span>{category.name}</span>
                                                    <span className="px-2 py-1 text-xs text-gray-600 bg-gray-200 rounded-full">{category.count}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
