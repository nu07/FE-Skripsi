"use client";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CalendarIcon, UserIcon } from "@heroicons/react/outline";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

type NewsArticle = {
    title: string;
    content: string;
    date: string;
    author: string;
    image: string;
    category: string;
};

const getNewsArticle = (slug: string) => {
    const articles: Record<string, NewsArticle> = {
        "kulit-buah-naga-camilan-sehat": {
            title: "Kulit Buah Naga Jadi Camilan Sehat, Kolaborasi Unpak dan Filipina di Kebun Merdesa",
            content: `
        <p>Dosen dan mahasiswa FMIPA Universitas Pakuan (Unpak) dalam program Pengabdian kepada Masyarakat (PKM) Internasional yang berlangsung di Kebun Merdesa, Bogor, berhasil mengembangkan inovasi pengolahan kulit buah naga menjadi camilan sehat.</p>
        
        <p>Program kolaborasi ini melibatkan tim dari Filipina yang membawa expertise dalam teknologi pengolahan makanan. Kegiatan ini merupakan bagian dari upaya Universitas Pakuan untuk mengembangkan produk inovatif berbasis sumber daya lokal.</p>
        
        <p>"Kulit buah naga yang selama ini dianggap limbah, ternyata memiliki kandungan antioksidan yang tinggi dan dapat diolah menjadi produk bernilai ekonomis," ungkap Dr. Sari Wahyuni, ketua tim PKM dari FMIPA Unpak.</p>
        
        <p>Melalui serangkaian penelitian dan pengembangan, tim berhasil menciptakan berbagai varian camilan dari kulit buah naga, mulai dari keripik, cookies, hingga permen jelly. Produk-produk ini tidak hanya lezat tetapi juga kaya akan nutrisi dan serat.</p>
        
        <p>Kegiatan ini juga melibatkan masyarakat lokal Kebun Merdesa sebagai mitra dalam pengembangan dan produksi. Diharapkan program ini dapat meningkatkan ekonomi masyarakat setempat sekaligus mengurangi limbah organik.</p>
      `,
            date: "21 April 2025",
            author: "Tim Humas Unpak",
            image: "/placeholder.svg?height=400&width=800",
            category: "Pengabdian Masyarakat",
        },
        "ai-deteksi-penyakit-tanaman": {
            title: "Breakthrough Penelitian AI untuk Deteksi Dini Penyakit Tanaman",
            content: `
        <p>Tim peneliti Fakultas Teknik Universitas Pakuan berhasil mengembangkan sistem AI yang dapat mendeteksi penyakit tanaman dengan akurasi mencapai 95%. Penelitian ini merupakan terobosan penting dalam bidang pertanian digital.</p>
        
        <p>Sistem yang dikembangkan menggunakan teknologi computer vision dan machine learning untuk menganalisis gambar daun tanaman dan mengidentifikasi berbagai jenis penyakit secara otomatis.</p>
        
        <p>"Kami menggunakan dataset yang terdiri dari ribuan gambar daun tanaman yang sehat dan sakit untuk melatih model AI," jelaskan Dr. Ahmad Fauzi, ketua tim peneliti.</p>
        
        <p>Aplikasi ini dapat membantu petani untuk mendeteksi penyakit tanaman lebih dini, sehingga dapat mengambil tindakan pencegahan yang tepat dan mengurangi kerugian hasil panen.</p>
      `,
            date: "20 April 2025",
            author: "Dr. Ahmad Fauzi",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
            category: "Penelitian",
        },
    };

    return articles[slug] || null;
};

export default function NewsDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    if (!slug) {
        return <div>Article not found</div>;
    }

    const article = getNewsArticle(slug);

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h1>
                    <Button onClick={() => navigate("/news")}>Kembali ke Berita</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button variant="default" onClick={() => navigate("/news")} className="mb-8">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Kembali ke Berita
                </Button>

                <Card className="overflow-hidden">
                    <div className="relative h-[400px] mb-10">
                        <img
                            src={article.image || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop"}
                            alt={article.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <UserIcon className="w-4 h-4" />
                                <span>{article.author}</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{article.category}</span>
                        </div>

                        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900">{article.title}</h1>

                        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
