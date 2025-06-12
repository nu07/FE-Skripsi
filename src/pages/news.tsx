"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import createDOMPurify from 'dompurify'
import { NewsData } from "@/types/news";
import Axios from "@/API/axios";


export default function NewsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [datanews, setDatanews] = useState<NewsData[] | any>([])
    const DOMPurify = createDOMPurify(window)
    const [pagination, setPagination] = useState({
        currentPages: 1,
        perPage: 4,
        totalPages: 1,
        totalItems: 1,
        isLoading: true,
    });
    ;

    const getAllNews = async () => {
        try {
            const res = await Axios.get(`/news?page=${pagination.currentPages}&limit=${pagination.perPage}`)
            setDatanews(res.data.data)
            setPagination((prev) => ({
                ...prev,
                totalPages: res.data.totalPages,
                totalItems: res.data.totalItems,
                isLoading: false,
            }));
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getAllNews();
    }, [pagination.currentPages]);

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
                    <div className="lg:col-span-4">
                        {/* Featured News Carousel */}
                        <div className="mb-12">
                            <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-900">
                                <TrendingUpIcon className="w-6 h-6 mr-2 text-blue-600" />
                                Berita Utama
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {datanews?.map((news: any) => (
                                    <Card key={news.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                                        <CardContent className="">
                                            <div className="flex items-center mt-4 mb-3 text-sm text-gray-500">
                                                <CalendarIcon className="w-4 h-4 mr-1" />
                                                <span className="mr-4">{new Date(news?.updatedAt).toLocaleString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}</span>
                                                <ClockIcon className="w-4 h-4 mr-1" />
                                                <span className="mr-4">Pukul {new Date(news?.updatedAt).toLocaleString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                })}</span>
                                                {/* <span>{news.views} views</span> */}
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2 text-center">{news.title}</h3>
                                            <p className="mb-4 text-gray-600 line-clamp-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.content) }}></p>
                                            <Button asChild className="w-full">
                                                <Link to={`/news/${news.id}`}>Baca Selengkapnya</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
