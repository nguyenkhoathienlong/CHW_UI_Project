"use client";
import { Home, Users, User, LogOut, FileText, ChevronLeft, ChevronRight, Globe, Monitor, ScrollText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { createContext, useContext } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Context để chia sẻ trạng thái sidebar
export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

// Define types for menu items
interface MenuChild {
  label: string;
  icon?: React.ElementType;
  active?: boolean;
  href?: string;
}
interface MenuItem {
  label: string;
  icon?: React.ElementType;
  children?: MenuChild[];
  active?: boolean;
  href?: string;
}

const menu: MenuItem[] = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Chương trình/dự án", icon: FileText, href: "/projects" },
  { label: "Chương trình cộng đồng", icon: Globe, href: "/community" },
  {
    label: "Tuyển dụng",
    children: [
      { label: "Tin tuyển dụng", icon: FileText, href: "/recruitment" },
      { label: "Quản lý đơn ứng tuyển", icon: Monitor, href: "/recruitment-list" },
    ],
  },
  {
    label: "Nhân sự",
    children: [
      { label: "Cộng tác viên", icon: Users, href: "/collaborators" },
      { label: "Nhân viên", icon: User, href: "/employees" },
      { label: "Hợp đồng", icon: ScrollText, href: "/contracts" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside style={{ 
        width: collapsed ? 44 : 250, 
        minWidth: collapsed ? 44 : 160, 
        height: 'calc(100vh - 64px)',
        background: 'white', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        boxShadow: '2px 0 8px #0001', 
        transition: 'width 0.2s', 
        position: 'fixed',
        top: 64,
        zIndex: 50,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <nav style={{ padding: collapsed ? '6px 0 0 0' : '10px 0 0 0' }}>
            <ul style={{ listStyle: 'none', padding: 6, margin: 6 }}>
              {menu.map((item, idx) => (
                <li key={item.label} style={{ marginBottom: 6 }}>
                  {item.children ? (
                    <div style={{ color: '#64748b', fontWeight: 600, padding: collapsed ? '6px 6px 2px 6px' : '6px 14px 2px 14px', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontFamily: 'Inter, Arial, sans-serif' }}>{collapsed ? item.icon && <item.icon size={16} style={{ marginRight: 0, color: '#2563eb' }} /> : item.label}</div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: collapsed ? '6px 6px' : '6px 14px',
                        color: isActive(item.href || '#') ? '#2563eb' : '#475569',
                        textDecoration: 'none',
                        fontWeight: isActive(item.href || '#') ? 700 : 500,
                        fontSize: 14,
                        borderRadius: 8,
                        background: isActive(item.href || '#') ? '#e0e7ef' : 'transparent',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#e0e7ef';
                        e.currentTarget.style.color = '#2563eb';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = isActive(item.href || '#') ? '#e0e7ef' : 'transparent';
                        e.currentTarget.style.color = isActive(item.href || '#') ? '#2563eb' : '#475569';
                      }}
                    >
                      {item.icon && React.createElement(item.icon, { size: collapsed ? 16 : 16, style: { marginRight: collapsed ? 0 : 6, color: '#2563eb' } })}
                      {!collapsed && item.label}
                    </Link>
                  )}
                  {item.children && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {item.children.map((child) => {
                        const hasIcon = 'icon' in child && child.icon;
                        const href = child.href || '#';
                        return (
                          <li key={child.label}>
                            <Link
                              href={href}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: collapsed ? '6px 6px' : '6px 20px',
                                color: isActive(href) ? '#2563eb' : '#475569',
                                textDecoration: 'none',
                                fontWeight: isActive(href) ? 700 : 500,
                                fontSize: 13,
                                borderRadius: 7,
                                background: isActive(href) ? '#e0e7ef' : 'transparent',
                                marginBottom: 1,
                                transition: 'background 0.2s, color 0.2s',
                                position: 'relative',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#e0e7ef';
                                e.currentTarget.style.color = '#2563eb';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = isActive(href) ? '#e0e7ef' : 'transparent';
                                e.currentTarget.style.color = isActive(href) ? '#2563eb' : '#475569';
                              }}
                            >
                              {hasIcon && child.icon ? React.createElement(child.icon, { size: collapsed ? 14 : 14, style: { marginRight: collapsed ? 0 : 6, color: '#2563eb' } }) : null}
                              {!collapsed && child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 0 }}>
          <button
            onClick={() => setCollapsed(v => !v)}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '1px solid #e5e7eb',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0001',
              marginBottom: 6,
              transition: 'background 0.2s',
            }}
            aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
            onMouseEnter={e => (e.currentTarget.style.background = '#e0e7ef')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            {collapsed ? <ChevronRight size={16} color="#2563eb" /> : <ChevronLeft size={16} color="#2563eb" />}
          </button>
          <div style={{
            width: '100%',
            paddingTop: 0,
            paddingRight: collapsed ? 6 : 12,
            paddingBottom: 8,
            paddingLeft: collapsed ? 6 : 12
          }}>
            <Button variant="outline" style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 7, fontWeight: 600, color: '#ef4444', borderColor: '#fca5a5', background: '#fff', transition: 'background 0.2s, color 0.2s', minHeight: 32, fontSize: 13, padding: '0 8px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0e7ef'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ef4444'; }}
            >
              <LogOut size={collapsed ? 13 : 14} style={{ marginRight: collapsed ? 0 : 6, color: '#ef4444' }} />
              {!collapsed && 'Đăng xuất'}
            </Button>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
} 