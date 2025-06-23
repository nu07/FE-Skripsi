function defaultFooter() {
  return (
    <footer className="bg-gray-50" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto pt-0 pb-8 px-4 sm:px-6 lg:pt-0 lg:px-8">
        <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
          
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Pakuan.ac.id All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default defaultFooter;
