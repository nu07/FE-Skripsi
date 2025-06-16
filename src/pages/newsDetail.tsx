"use client";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CalendarIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Axios from "@/API/axios";
import { NewsData } from "@/types/news";
import createDOMPurify from "dompurify";
import { useState, useEffect } from "react";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const DOMPurify = createDOMPurify(window);
  const [dataNews, setDatanews] = useState<NewsData | null>(null);

  const getNewsById = async () => {
    try {
      const res = await Axios.get(`/news/${slug}`);
      setDatanews(res.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    getNewsById();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <Button variant="default" onClick={() => navigate("/news")} className="mb-8">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Kembali ke Berita
        </Button>

        <Card className="overflow-hidden">
          <CardContent>
            {dataNews ? (
              <>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1 pt-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(dataNews.updatedAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 pt-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{dataNews.admin.nama}</span>
                  </div>
                </div>
                <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 text-center">{dataNews.title}</h1>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataNews.content) }} />
              </>
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
