import { useState, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

function Logo3D() {
  const { scene } = useGLTF("/models/logo_3d.glb");
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });
  return <primitive ref={ref} object={scene} scale={0.9} position={[0, 0, 0]} />;
}

const serviceLinks = [
  { label: "Создание сайтов", href: "/services/web-development" },
  { label: "Поведенческие факторы", href: "/services/behavioral-factors" },
  { label: "SEO-продвижение", href: "/services/seo" },
  { label: "SMM-продвижение", href: "/services/smm" },
];

const navLinks = [
  { label: "Портфолио", href: "/portfolio" },
  { label: "Блог", href: "/blog" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded">
            <Suspense fallback={<img src="/logo.png" alt="HulkWork Studio" className="h-10 w-auto" />}>
              <Canvas camera={{ position: [0, 0, 3], fov: 40 }} style={{ width: 40, height: 40 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 3, 3]} intensity={1} />
                <Logo3D />
              </Canvas>
            </Suspense>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Услуги
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="min-w-[220px] rounded-lg border bg-background p-1.5 shadow-lg">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            <button
              className="flex items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Услуги
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l pl-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-md px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
