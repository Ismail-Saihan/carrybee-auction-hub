"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Eye,
  Download,
  Trash2,
  Home,
  Search,
  CheckCircle2,
  Bell,
  Settings,
  Sun,
  UserCheck,
  LayoutGrid,
  Package,
  User,
  Sliders,
  FileText,
  ShoppingBag,
  Calendar,
  Maximize2,
  Scissors,
  UserX,
  AlertCircle,
  Shield,
  Heart,
  Target,
  MapPin,
  Zap,
  Lock,
  Bookmark,
  Clock,
  MessageSquare,
} from "lucide-react";

import { CarryBeeLogo } from "@/components/brand/carrybee-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Tabs } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuctionCard } from "@/components/auction/auction-card";

export default function DesignSystemShowcasePage() {
  const [selectedRadio, setSelectedRadio] = useState("radio-1");
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] pb-24">
      {/* Top Banner / Hero Header */}
      <header className="bg-[#111827] text-white border-b border-[#1F2937] px-6 py-6 sm:px-10 sm:py-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-wrap">
            <CarryBeeLogo variant="dark" width={180} priority />
            <div className="h-10 w-[1px] bg-[#374151] hidden sm:block" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Auction Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFC107] text-[#111827]">
                  Design System v1.0
                </span>
              </div>
              <p className="text-sm text-[#9CA3AF] mt-0.5">
                Internal System Design
              </p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wider text-[#9CA3AF] font-medium">
              CarryBee Logistics Ltd.
            </p>
            <p className="text-sm font-medium text-[#F3F4F6]">
              Complete UI/UX Design System for Auction Management Platform
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 space-y-12">
        {/* SECTION 1: LOGO USAGE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Logo Usage</h2>
              <p className="text-sm text-[#6B7280]">
                Official CarryBee brand assets across surface variants and minimum clear space
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dark Background */}
            <div className="flex flex-col items-center">
              <div className="w-full h-32 rounded-xl bg-[#111827] flex items-center justify-center p-4 border border-[#1F2937] shadow-inner">
                <CarryBeeLogo variant="dark" width={150} />
              </div>
              <span className="text-xs font-medium text-[#6B7280] mt-2.5">
                Primary Logo (Dark Background)
              </span>
            </div>

            {/* Light Background */}
            <div className="flex flex-col items-center">
              <div className="w-full h-32 rounded-xl bg-white flex items-center justify-center p-4 border border-[#E5E7EB] shadow-xs">
                <CarryBeeLogo variant="light" width={150} />
              </div>
              <span className="text-xs font-medium text-[#6B7280] mt-2.5">
                On Light Background
              </span>
            </div>

            {/* Icon / Favicon */}
            <div className="flex flex-col items-center">
              <div className="w-full h-32 rounded-xl bg-[#F8FAFC] flex items-center justify-center p-4 border border-[#E5E7EB] gap-5">
                <div className="flex flex-col items-center gap-1.5">
                  <CarryBeeLogo variant="icon" width={56} height={56} />
                  <span className="text-[10px] font-medium text-[#6B7280]">Dark Squircle</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center p-2 shadow-xs">
                    <Image
                      src="/favicon.png"
                      alt="CarryBee Favicon"
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-[#6B7280]">carrybee.com</span>
                </div>
              </div>
              <span className="text-xs font-medium text-[#6B7280] mt-2.5">
                Icon / Favicon
              </span>
            </div>

            {/* Clear Space & Minimum Size */}
            <div className="flex flex-col items-center">
              <div className="w-full h-32 rounded-xl bg-white flex items-center justify-center p-4 border border-dashed border-[#FFC107] relative">
                <div className="p-2 border border-dotted border-[#9CA3AF] rounded">
                  <CarryBeeLogo variant="light" width={110} />
                </div>
                <span className="absolute top-1.5 left-2 text-[10px] text-[#9CA3AF] font-mono">
                  safe-zone
                </span>
              </div>
              <span className="text-xs font-medium text-[#6B7280] mt-2.5">
                Clear Space &amp; Minimum Size
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: COLOR SYSTEM */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Color System</h2>
            <p className="text-sm text-[#6B7280]">
              Authoritative palette for CarryBee brand accents, neutrals, semantic states, and auction status badges
            </p>
          </div>

          {/* Primary Brand & Neutral Colors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Brand Colors (5 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Primary Brand Colors
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#FFC107] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#FFC107</p>
                  <p className="text-[11px] font-semibold text-[#374151]">CarryBee Yellow</p>
                  <p className="text-[10px] text-[#6B7280]">Primary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#FFB800] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#FFB800</p>
                  <p className="text-[11px] font-semibold text-[#374151]">Yellow Dark</p>
                  <p className="text-[10px] text-[#6B7280]">Hover / Active</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#E6A700] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#E6A700</p>
                  <p className="text-[11px] font-semibold text-[#374151]">Yellow Deep</p>
                  <p className="text-[10px] text-[#6B7280]">Pressed / Emphasis</p>
                </div>
              </div>
            </div>

            {/* Neutral Colors (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Neutral Colors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#111827] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#111827</p>
                  <p className="text-[11px] font-medium text-[#374151]">Background</p>
                  <p className="text-[10px] text-[#6B7280]">Primary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#1F2937] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#1F2937</p>
                  <p className="text-[11px] font-medium text-[#374151]">Background</p>
                  <p className="text-[10px] text-[#6B7280]">Secondary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#374151] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#374151</p>
                  <p className="text-[11px] font-medium text-[#374151]">Surface</p>
                  <p className="text-[10px] text-[#6B7280]">Tertiary</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#6B7280] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#6B7280</p>
                  <p className="text-[11px] font-medium text-[#374151]">Text Muted</p>
                  <p className="text-[10px] text-[#6B7280]">Placeholder</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#F8FAFC</p>
                  <p className="text-[11px] font-medium text-[#374151]">Page Bg</p>
                  <p className="text-[10px] text-[#6B7280]">Body</p>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs" />
                  <p className="text-xs font-bold text-[#111827]">#FFFFFF</p>
                  <p className="text-[11px] font-medium text-[#374151]">Card / Modal</p>
                  <p className="text-[10px] text-[#6B7280]">Surface</p>
                </div>
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Semantic Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="space-y-1.5">
                <div className="h-12 rounded-lg bg-[#10B981] shadow-xs" />
                <p className="text-xs font-bold text-[#111827]">#10B981</p>
                <p className="text-[11px] font-medium text-[#374151]">Success</p>
                <p className="text-[10px] text-[#6B7280]">Success states</p>
              </div>
              <div className="space-y-1.5">
                <div className="h-12 rounded-lg bg-[#EF4444] shadow-xs" />
                <p className="text-xs font-bold text-[#111827]">#EF4444</p>
                <p className="text-[11px] font-medium text-[#374151]">Error</p>
                <p className="text-[10px] text-[#6B7280]">Error states</p>
              </div>
              <div className="space-y-1.5">
                <div className="h-12 rounded-lg bg-[#F59E0B] shadow-xs" />
                <p className="text-xs font-bold text-[#111827]">#F59E0B</p>
                <p className="text-[11px] font-medium text-[#374151]">Warning</p>
                <p className="text-[10px] text-[#6B7280]">Warning states</p>
              </div>
              <div className="space-y-1.5">
                <div className="h-12 rounded-lg bg-[#3B82F6] shadow-xs" />
                <p className="text-xs font-bold text-[#111827]">#3B82F6</p>
                <p className="text-[11px] font-medium text-[#374151]">Info</p>
                <p className="text-[10px] text-[#6B7280]">Information</p>
              </div>
              <div className="space-y-1.5">
                <div className="h-12 rounded-lg bg-[#8B5CF6] shadow-xs" />
                <p className="text-xs font-bold text-[#111827]">#8B5CF6</p>
                <p className="text-[11px] font-medium text-[#374151]">Secondary</p>
                <p className="text-[10px] text-[#6B7280]">Secondary actions</p>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Status Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5">
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#10B981] flex items-center justify-center text-white text-[10px] font-bold">
                  LIVE
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#10B981</p>
                <p className="text-[10px] text-[#6B7280]">Live auction</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#F59E0B] flex items-center justify-center text-white text-[10px] font-bold">
                  ENDING SOON
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#F59E0B</p>
                <p className="text-[10px] text-[#6B7280]">Ending soon</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#3B82F6] flex items-center justify-center text-white text-[10px] font-bold">
                  UPCOMING
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#3B82F6</p>
                <p className="text-[10px] text-[#6B7280]">Upcoming</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#6B7280] flex items-center justify-center text-white text-[10px] font-bold">
                  ENDED
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#6B7280</p>
                <p className="text-[10px] text-[#6B7280]">Auction ended</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#059669] flex items-center justify-center text-white text-[10px] font-bold">
                  WON
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#059669</p>
                <p className="text-[10px] text-[#6B7280]">User won</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#EF4444] flex items-center justify-center text-white text-[10px] font-bold">
                  LOST
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#EF4444</p>
                <p className="text-[10px] text-[#6B7280]">User lost</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#D97706] flex items-center justify-center text-white text-[10px] font-bold">
                  PAYMENT PENDING
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#D97706</p>
                <p className="text-[10px] text-[#6B7280]">Payment pending</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#2563EB] flex items-center justify-center text-white text-[10px] font-bold">
                  COMPLETED
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#2563EB</p>
                <p className="text-[10px] text-[#6B7280]">Completed</p>
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 rounded-md bg-[#9CA3AF] flex items-center justify-center text-white text-[10px] font-bold">
                  CANCELLED
                </div>
                <p className="text-[11px] font-mono text-[#374151]">#9CA3AF</p>
                <p className="text-[10px] text-[#6B7280]">Cancelled</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TYPOGRAPHY */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Typography</h2>
            <p className="text-sm text-[#6B7280]">
              Inter font family with designated weights, line heights, and hierarchy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Font Family Banner */}
            <div className="lg:col-span-4 p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#6B7280] font-semibold">
                  Font Family
                </span>
                <h3 className="text-4xl font-extrabold text-[#111827] mt-1">Inter</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                  <br />
                  0123456789
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-[#6B7280] pt-4 border-t border-[#E2E8F0] mt-4">
                <span>Light 300</span>
                <span>•</span>
                <span>Regular 400</span>
                <span>•</span>
                <span>Medium 500</span>
                <span>•</span>
                <span>Semibold 600</span>
                <span>•</span>
                <span>Bold 700</span>
              </div>
            </div>

            {/* Type Scale Table */}
            <div className="lg:col-span-8 overflow-x-auto">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                Type Scale
              </h3>
              <table className="w-full text-left text-sm border border-[#E5E7EB] rounded-lg overflow-hidden">
                <thead className="bg-[#F8FAFC] text-xs uppercase text-[#6B7280] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-2.5 px-3">Style</th>
                    <th className="py-2.5 px-3">Weight</th>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Line Height</th>
                    <th className="py-2.5 px-3">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">Display</td>
                    <td className="py-2 px-3 text-[#6B7280]">700</td>
                    <td className="py-2 px-3 text-[#6B7280]">48px</td>
                    <td className="py-2 px-3 text-[#6B7280]">56px</td>
                    <td className="py-2 px-3 cb-display">Display Text</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">H1</td>
                    <td className="py-2 px-3 text-[#6B7280]">700</td>
                    <td className="py-2 px-3 text-[#6B7280]">36px</td>
                    <td className="py-2 px-3 text-[#6B7280]">44px</td>
                    <td className="py-2 px-3 cb-h1">Heading 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">H2</td>
                    <td className="py-2 px-3 text-[#6B7280]">600</td>
                    <td className="py-2 px-3 text-[#6B7280]">30px</td>
                    <td className="py-2 px-3 text-[#6B7280]">38px</td>
                    <td className="py-2 px-3 cb-h2">Heading 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">H3</td>
                    <td className="py-2 px-3 text-[#6B7280]">600</td>
                    <td className="py-2 px-3 text-[#6B7280]">24px</td>
                    <td className="py-2 px-3 text-[#6B7280]">32px</td>
                    <td className="py-2 px-3 cb-h3">Heading 3</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">H4</td>
                    <td className="py-2 px-3 text-[#6B7280]">600</td>
                    <td className="py-2 px-3 text-[#6B7280]">20px</td>
                    <td className="py-2 px-3 text-[#6B7280]">28px</td>
                    <td className="py-2 px-3 cb-h4">Heading 4</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">H5</td>
                    <td className="py-2 px-3 text-[#6B7280]">600</td>
                    <td className="py-2 px-3 text-[#6B7280]">18px</td>
                    <td className="py-2 px-3 text-[#6B7280]">26px</td>
                    <td className="py-2 px-3 cb-h5">Heading 5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">Body Large</td>
                    <td className="py-2 px-3 text-[#6B7280]">400</td>
                    <td className="py-2 px-3 text-[#6B7280]">16px</td>
                    <td className="py-2 px-3 text-[#6B7280]">24px</td>
                    <td className="py-2 px-3 cb-body-lg">Body Large Text</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">Body</td>
                    <td className="py-2 px-3 text-[#6B7280]">400</td>
                    <td className="py-2 px-3 text-[#6B7280]">14px</td>
                    <td className="py-2 px-3 text-[#6B7280]">20px</td>
                    <td className="py-2 px-3 cb-body">Body Text</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">Body Small</td>
                    <td className="py-2 px-3 text-[#6B7280]">400</td>
                    <td className="py-2 px-3 text-[#6B7280]">12px</td>
                    <td className="py-2 px-3 text-[#6B7280]">18px</td>
                    <td className="py-2 px-3 cb-body-sm">Body Small Text</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-[#111827]">Caption</td>
                    <td className="py-2 px-3 text-[#6B7280]">400</td>
                    <td className="py-2 px-3 text-[#6B7280]">11px</td>
                    <td className="py-2 px-3 text-[#6B7280]">16px</td>
                    <td className="py-2 px-3 cb-caption">Caption Text</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Text Styles & Text Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#F1F5F9]">
            {/* Text Styles */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Text Styles
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xl font-bold text-[#111827]">Page Title</h4>
                  <p className="text-xs text-[#6B7280]">Page headers and main titles</p>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-[#111827]">Heading 1</h5>
                  <p className="text-xs text-[#6B7280]">Section titles</p>
                </div>
                <div>
                  <h6 className="text-base font-semibold text-[#111827]">Heading 2</h6>
                  <p className="text-xs text-[#6B7280]">Card titles and subsection headers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Heading 3</p>
                  <p className="text-xs text-[#6B7280]">Group titles</p>
                </div>
                <div>
                  <p className="text-base font-normal text-[#374151]">Body Large</p>
                  <p className="text-xs text-[#6B7280]">Important body text</p>
                </div>
                <div>
                  <p className="text-xs font-normal text-[#6B7280]">Body Small</p>
                  <p className="text-xs text-[#6B7280]">Secondary information</p>
                </div>
                <div>
                  <p className="text-[11px] font-normal text-[#6B7280]">Caption</p>
                  <p className="text-xs text-[#6B7280]">Labels, hints, and captions</p>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Text Colors
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#111827] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Primary Text (#111827)</p>
                    <p className="text-xs text-[#6B7280]">Main headings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#374151] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#374151]">Secondary Text (#374151)</p>
                    <p className="text-xs text-[#6B7280]">Body text</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#6B7280] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#6B7280]">Tertiary Text (#6B7280)</p>
                    <p className="text-xs text-[#6B7280]">Muted text</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#9CA3AF] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#9CA3AF]">Disabled Text (#9CA3AF)</p>
                    <p className="text-xs text-[#6B7280]">Disabled state</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#2563EB] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#2563EB]">Link Text (#2563EB)</p>
                    <p className="text-xs text-[#6B7280]">Links and actions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#111827] flex items-center justify-center border border-[#374151] shrink-0">
                    <span className="text-[10px] text-white font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Inverse Text (#FFFFFF)</p>
                    <p className="text-xs text-[#6B7280]">On dark backgrounds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ICONOGRAPHY */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Iconography</h2>
              <p className="text-sm text-[#6B7280]">
                Using Lucide Icons (consistent, clean, modern)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-4 text-[#374151]">
            {[
              { icon: <Home className="w-5 h-5" />, name: "Home" },
              { icon: <Search className="w-5 h-5" />, name: "Search" },
              { icon: <CheckCircle2 className="w-5 h-5" />, name: "Check" },
              { icon: <Bell className="w-5 h-5" />, name: "Bell" },
              { icon: <Settings className="w-5 h-5" />, name: "Settings" },
              { icon: <Sun className="w-5 h-5" />, name: "Sun" },
              { icon: <UserCheck className="w-5 h-5" />, name: "UserCheck" },
              { icon: <LayoutGrid className="w-5 h-5" />, name: "Grid" },
              { icon: <Package className="w-5 h-5" />, name: "Package" },
              { icon: <User className="w-5 h-5" />, name: "User" },
              { icon: <Sliders className="w-5 h-5" />, name: "Sliders" },
              { icon: <FileText className="w-5 h-5" />, name: "FileText" },
              { icon: <ShoppingBag className="w-5 h-5" />, name: "Bag" },
              { icon: <Calendar className="w-5 h-5" />, name: "Calendar" },
              { icon: <Maximize2 className="w-5 h-5" />, name: "Maximize" },
              { icon: <Plus className="w-5 h-5" />, name: "Plus" },
              { icon: <Scissors className="w-5 h-5" />, name: "Tag" },
              { icon: <UserX className="w-5 h-5" />, name: "UserX" },
              { icon: <AlertCircle className="w-5 h-5" />, name: "Alert" },
              { icon: <Shield className="w-5 h-5" />, name: "Shield" },
              { icon: <Heart className="w-5 h-5" />, name: "Heart" },
              { icon: <Eye className="w-5 h-5" />, name: "Eye" },
              { icon: <Target className="w-5 h-5" />, name: "Target" },
              { icon: <MapPin className="w-5 h-5" />, name: "MapPin" },
              { icon: <Zap className="w-5 h-5" />, name: "Zap" },
              { icon: <Lock className="w-5 h-5" />, name: "Lock" },
              { icon: <Bookmark className="w-5 h-5" />, name: "Bookmark" },
              { icon: <Clock className="w-5 h-5" />, name: "Clock" },
              { icon: <MessageSquare className="w-5 h-5" />, name: "Message" },
              { icon: <Trash2 className="w-5 h-5" />, name: "Trash" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] hover:border-[#FFC107] hover:bg-white transition-colors gap-1.5"
                title={item.name}
              >
                {item.icon}
                <span className="text-[10px] text-[#6B7280] truncate max-w-full">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: BUTTONS */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Buttons</h2>
            <p className="text-sm text-[#6B7280]">
              Button hierarchy across variants, states, sizes, and icon integrations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Button Variants & States Table */}
            <div className="lg:col-span-8 overflow-x-auto">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                Variants &amp; States
              </h3>
              <table className="w-full text-left text-sm border border-[#E5E7EB] rounded-lg">
                <thead className="bg-[#F8FAFC] text-xs uppercase text-[#6B7280] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-2.5 px-3">Variant</th>
                    <th className="py-2.5 px-3">Default</th>
                    <th className="py-2.5 px-3">Hover</th>
                    <th className="py-2.5 px-3">Active</th>
                    <th className="py-2.5 px-3">Disabled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  <tr>
                    <td className="py-3 px-3 font-medium text-[#111827]">Primary</td>
                    <td className="py-3 px-3">
                      <Button variant="primary" size="small">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="primary" size="small" forceState="hover">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="primary" size="small" forceState="active">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="primary" size="small" forceState="disabled">Button</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-[#111827]">Secondary</td>
                    <td className="py-3 px-3">
                      <Button variant="secondary" size="small">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="secondary" size="small" forceState="hover">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="secondary" size="small" forceState="active">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="secondary" size="small" forceState="disabled">Button</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-[#111827]">Outline</td>
                    <td className="py-3 px-3">
                      <Button variant="outline" size="small">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="outline" size="small" forceState="hover">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="outline" size="small" forceState="active">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="outline" size="small" forceState="disabled">Button</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-[#111827]">Ghost</td>
                    <td className="py-3 px-3">
                      <Button variant="ghost" size="small">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="ghost" size="small" forceState="hover">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="ghost" size="small" forceState="active">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="ghost" size="small" forceState="disabled">Button</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-[#111827]">Danger</td>
                    <td className="py-3 px-3">
                      <Button variant="danger" size="small">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="danger" size="small" forceState="hover">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="danger" size="small" forceState="active">Button</Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button variant="danger" size="small" forceState="disabled">Button</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Button Sizes & With Icons */}
            <div className="lg:col-span-4 space-y-6">
              {/* Button Sizes */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Button Sizes
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Small (32px)</span>
                    <Button size="small" variant="outline">Button</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Medium (40px)</span>
                    <Button size="medium" variant="primary">Button</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Large (48px)</span>
                    <Button size="large" variant="primary">Button</Button>
                  </div>
                </div>
              </div>

              {/* Button with Icons */}
              <div className="pt-4 border-t border-[#F1F5F9]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Button with Icons
                </h3>
                <div className="flex flex-col gap-2.5">
                  <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                    Create Auction
                  </Button>
                  <Button variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
                    View Details
                  </Button>
                  <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                    Download
                  </Button>
                  <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FORM ELEMENTS */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Form Elements</h2>
            <p className="text-sm text-[#6B7280]">
              Text inputs, select dropdowns, textareas, checkboxes, radio buttons, and toggle switches with comprehensive states
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs & Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Text Input &amp; Select
              </h3>
              <Input
                label="Text Input"
                placeholder="Enter text..."
              />
              <Select
                label="Dropdown"
                placeholder="Select option"
                options={[
                  { label: "Option One", value: "1" },
                  { label: "Option Two", value: "2" },
                  { label: "Option Three", value: "3" },
                ]}
              />
              <Textarea
                label="Textarea"
                placeholder="Enter your message..."
              />
            </div>

            {/* States Showcase (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                States (Focus, Error, Success)
              </h3>
              <Input
                label="Default"
                defaultValue="Input text..."
                readOnly
              />
              <Input
                label="Focused"
                forceState="focused"
                defaultValue="Input text..."
                readOnly
              />
              <Input
                label="Error"
                forceState="error"
                defaultValue="Input text..."
                error="This field is required"
                readOnly
              />
              <Input
                label="Success"
                forceState="success"
                defaultValue="Input text..."
                success
                readOnly
              />
            </div>
          </div>

          {/* Checkbox, Radio & Toggle Switch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#F1F5F9]">
            {/* Checkbox & Radio */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Checkbox &amp; Radio
              </h3>
              <div className="flex flex-col gap-3">
                <Checkbox
                  label="Checked"
                  checked={checkbox1}
                  onChange={(e) => setCheckbox1(e.target.checked)}
                />
                <Checkbox
                  label="Unchecked"
                  checked={checkbox2}
                  onChange={(e) => setCheckbox2(e.target.checked)}
                />
                <Checkbox
                  label="Disabled"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t border-[#F1F5F9]">
                <Radio
                  label="Radio selected"
                  name="demo-radio"
                  checked={selectedRadio === "radio-1"}
                  onChange={() => setSelectedRadio("radio-1")}
                />
                <Radio
                  label="Radio unselected"
                  name="demo-radio"
                  checked={selectedRadio === "radio-2"}
                  onChange={() => setSelectedRadio("radio-2")}
                />
                <Radio
                  label="Radio disabled"
                  name="demo-radio-disabled"
                  disabled
                />
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Toggle Switch
              </h3>
              <div className="flex flex-col gap-4">
                <Switch
                  label="Off"
                  checked={switch1}
                  onCheckedChange={setSwitch1}
                />
                <Switch
                  label="On"
                  checked={switch2}
                  onCheckedChange={setSwitch2}
                />
                <Switch
                  label="Disabled"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: BADGES & TAGS */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Badges &amp; Tags</h2>
            <p className="text-sm text-[#6B7280]">
              Lifecycle status badges and item category classification pills
            </p>
          </div>

          {/* Status Badges */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Status Badges (Subtle / Tinted)
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <Badge status="live" dot>Live</Badge>
              <Badge status="ending-soon">Ending Soon</Badge>
              <Badge status="upcoming">Upcoming</Badge>
              <Badge status="ended">Ended</Badge>
              <Badge status="won">Won</Badge>
              <Badge status="lost">Lost</Badge>
              <Badge status="payment-pending">Payment Pending</Badge>
              <Badge status="completed">Completed</Badge>
              <Badge status="cancelled">Cancelled</Badge>
            </div>
          </div>

          {/* Category & Condition Tags */}
          <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Category &amp; Condition Tags
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="tag">Open Box</Badge>
              <Badge variant="tag">Refurbished</Badge>
              <Badge variant="tag">New</Badge>
              <Badge variant="tag">Electronics</Badge>
              <Badge variant="tag">Fashion</Badge>
              <Badge variant="tag">Home &amp; Living</Badge>
              <Badge variant="tag">Other</Badge>
            </div>
          </div>
        </section>

        {/* SECTION 8: ALERTS */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Alerts</h2>
            <p className="text-sm text-[#6B7280]">
              Feedback banners for success, error, warning, and informational states with dismiss actions
            </p>
          </div>

          <div className="space-y-3">
            <Alert type="success">This is a success message.</Alert>
            <Alert type="error">This is an error message.</Alert>
            <Alert type="warning">This is a warning message.</Alert>
            <Alert type="info">This is an information message.</Alert>
          </div>
        </section>

        {/* SECTION 9: NAVIGATION & STRUCTURAL (TABS, PAGINATION, BREADCRUMB) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">
              Navigation &amp; Structural Components
            </h2>
            <p className="text-sm text-[#6B7280]">
              Tabs with CarryBee Yellow active indicators, numbered pagination, and breadcrumbs
            </p>
          </div>

          <div className="space-y-6">
            {/* Tabs */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                Tabs
              </h3>
              <Tabs
                tabs={[
                  { id: "tab-1", label: "Active Tab" },
                  { id: "tab-2", label: "Tab Two" },
                  { id: "tab-3", label: "Tab Three" },
                  { id: "tab-4", label: "Tab Four" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {/* Pagination & Breadcrumb */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#F1F5F9]">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Pagination
                </h3>
                <Pagination
                  currentPage={activePage}
                  totalPages={10}
                  onPageChange={setActivePage}
                />
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  Breadcrumb
                </h3>
                <Breadcrumb
                  items={[
                    { label: "Auctions", href: "#" },
                    { label: "Live Auctions" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: CARD EXAMPLE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="border-b border-[#F1F5F9] pb-4">
            <h2 className="text-xl font-bold text-[#111827]">Card Example</h2>
            <p className="text-sm text-[#6B7280]">
              Auction Lot Card faithfully replicating the live auction card specification
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <AuctionCard
              title="Laptop - Dell Latitude 5420"
              category="Electronics"
              condition="Open Box"
              currentBid="28,000"
              bidCount={12}
              timeRemaining="02:14:32"
              imageUrl="/dell-laptop.png"
              status="live"
              onViewDetails={() => alert("Viewing details for Dell Latitude 5420")}
            />

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-2 max-w-sm">
              <p className="font-semibold text-[#111827]">Auction Card Specifications:</p>
              <ul className="list-disc list-inside space-y-1 text-[#6B7280]">
                <li>Pinned live status badge with pulsing dot</li>
                <li>Interactive watchlist heart button</li>
                <li>Bangladeshi Taka symbol (৳) for authoritative pricing</li>
                <li>Realtime bid count and remaining time indicators</li>
                <li>Full-width CarryBee yellow primary action button</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
