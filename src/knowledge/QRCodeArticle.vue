<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import AdBanner from '@/components/AdBanner.vue'

usePageMeta('二维码原理 - QR码技术详解', 'QR码（Quick Response Code）完整技术教程：二维码结构与组成、纠错机制原理、编码模式详解、掩码与版本、实际应用场景')
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <AdBanner position="header" />

    <h1 class="text-3xl font-bold mb-2">二维码原理</h1>
    <p class="text-sm mb-8" :style="{ color: 'var(--text-secondary)' }">QR 码（Quick Response Code）技术详解</p>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">一、QR 码简介</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>QR 码（Quick Response Code，快速响应码）是 1994 年由日本 Denso Wave 公司发明的一种矩阵式二维条码。与传统的条形码（一维码）不同，QR 码在水平和垂直两个方向都存储信息，因此能在同样面积内容纳更多的数据。</p>
        <p>"QR" 这个名字源于其设计目标——"快速响应"：解码速度要快。QR 码在三个角落设置了位置探测图形，使扫描设备可以从任意角度快速识别和定位，无需精确对准。这种设计使得 QR 码的识别速度远优于其他二维条码技术。</p>
        <p>QR 码的发明者 Denso Wave 公司虽然拥有 QR 码的专利，但选择不行使专利权，将其作为开放标准推广。这使得 QR 码得以在全球范围内免费使用和普及。2000 年，QR 码被标准化为 ISO/IEC 18004 国际标准。</p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">二、二维码的结构</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>一个完整的 QR 码由多个功能区域组成。下图展示了一个标准 QR 码 Version 7 的结构：</p>

        <!-- QR Code Structure SVG Diagram -->
        <div class="flex justify-center my-6">
          <svg viewBox="0 0 400 400" width="320" height="320" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="400" height="400" fill="white" rx="8"/>

            <!-- Finder Pattern (top-left) -->
            <rect x="20" y="20" width="56" height="56" rx="4" fill="none" stroke="#2563eb" stroke-width="2.5"/>
            <rect x="28" y="28" width="40" height="40" rx="2" fill="none" stroke="#2563eb" stroke-width="2"/>
            <rect x="36" y="36" width="24" height="24" rx="1" fill="#2563eb"/>

            <!-- Finder Pattern (top-right) -->
            <rect x="324" y="20" width="56" height="56" rx="4" fill="none" stroke="#2563eb" stroke-width="2.5"/>
            <rect x="332" y="28" width="40" height="40" rx="2" fill="none" stroke="#2563eb" stroke-width="2"/>
            <rect x="340" y="36" width="24" height="24" rx="1" fill="#2563eb"/>

            <!-- Finder Pattern (bottom-left) -->
            <rect x="20" y="324" width="56" height="56" rx="4" fill="none" stroke="#2563eb" stroke-width="2.5"/>
            <rect x="28" y="332" width="40" height="40" rx="2" fill="none" stroke="#2563eb" stroke-width="2"/>
            <rect x="36" y="340" width="24" height="24" rx="1" fill="#2563eb"/>

            <!-- Timing Patterns -->
            <line x1="92" y1="48" x2="308" y2="48" stroke="#10b981" stroke-width="3" stroke-dasharray="4,4"/>
            <line x1="48" y1="92" x2="48" y2="308" stroke="#10b981" stroke-width="3" stroke-dasharray="4,4"/>

            <!-- Data Area (represented as small dots) -->
            <g fill="#6b7280" opacity="0.4">
              <circle cx="100" cy="100" r="2"/><circle cx="110" cy="100" r="2"/><circle cx="120" cy="100" r="2"/>
              <circle cx="140" cy="100" r="2"/><circle cx="150" cy="100" r="2"/><circle cx="160" cy="100" r="2"/>
              <circle cx="100" cy="110" r="2"/><circle cx="120" cy="110" r="2"/><circle cx="130" cy="110" r="2"/>
              <circle cx="150" cy="110" r="2"/><circle cx="170" cy="110" r="2"/><circle cx="180" cy="110" r="2"/>
              <circle cx="110" cy="120" r="2"/><circle cx="130" cy="120" r="2"/><circle cx="140" cy="120" r="2"/>
              <circle cx="160" cy="120" r="2"/><circle cx="170" cy="120" r="2"/><circle cx="180" cy="120" r="2"/>
              <circle cx="100" cy="130" r="2"/><circle cx="110" cy="130" r="2"/><circle cx="130" cy="130" r="2"/>
              <circle cx="150" cy="130" r="2"/><circle cx="160" cy="130" r="2"/><circle cx="180" cy="130" r="2"/>
              <circle cx="120" cy="140" r="2"/><circle cx="130" cy="140" r="2"/><circle cx="150" cy="140" r="2"/>
              <circle cx="100" cy="150" r="2"/><circle cx="110" cy="150" r="2"/><circle cx="140" cy="150" r="2"/>
              <circle cx="160" cy="150" r="2"/><circle cx="170" cy="150" r="2"/><circle cx="130" cy="160" r="2"/>
              <circle cx="150" cy="160" r="2"/><circle cx="180" cy="160" r="2"/><circle cx="100" cy="170" r="2"/>
            </g>

            <!-- Error Correction Area -->
            <g fill="#f59e0b" opacity="0.35">
              <circle cx="250" cy="100" r="2"/><circle cx="260" cy="100" r="2"/><circle cx="270" cy="100" r="2"/>
              <circle cx="280" cy="100" r="2"/><circle cx="290" cy="100" r="2"/><circle cx="300" cy="100" r="2"/>
              <circle cx="250" cy="110" r="2"/><circle cx="260" cy="110" r="2"/><circle cx="280" cy="110" r="2"/>
              <circle cx="290" cy="110" r="2"/><circle cx="300" cy="110" r="2"/><circle cx="250" cy="120" r="2"/>
              <circle cx="270" cy="120" r="2"/><circle cx="280" cy="120" r="2"/><circle cx="290" cy="120" r="2"/>
              <circle cx="300" cy="120" r="2"/><circle cx="260" cy="130" r="2"/><circle cx="270" cy="130" r="2"/>
              <circle cx="250" cy="140" r="2"/><circle cx="260" cy="140" r="2"/><circle cx="300" cy="140" r="2"/>
              <circle cx="250" cy="150" r="2"/><circle cx="270" cy="150" r="2"/><circle cx="280" cy="150" r="2"/>
              <circle cx="250" cy="160" r="2"/><circle cx="260" cy="160" r="2"/><circle cx="280" cy="160" r="2"/>
              <circle cx="300" cy="160" r="2"/><circle cx="270" cy="170" r="2"/><circle cx="290" cy="170" r="2"/>
            </g>

            <!-- Quiet Zone -->
            <rect x="12" y="12" width="376" height="376" rx="4" fill="none" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4,3"/>

            <!-- Labels -->
            <text x="200" y="395" text-anchor="middle" font-size="9" fill="#9ca3af">静区 (Quiet Zone)</text>
          </svg>
        </div>

        <p>QR 码的关键区域包括：</p>

        <div class="space-y-4">
          <div class="flex gap-4 p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="w-16 h-16 shrink-0 rounded flex items-center justify-center" style="background:#2563eb">
              <svg width="36" height="36" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="white" stroke-width="2"/>
                <rect x="7" y="7" width="10" height="10" rx="1" fill="white"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">位置探测图形（Finder Pattern）</div>
              <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">位于 QR 码的三个角落（左上、右上、左下），由 3 层嵌套的回形方框组成。扫描设备通过这三个图案快速定位二维码的位置、方向和倾斜角度，实现 360° 全方位快速识别。即使二维码旋转、倾斜或被部分遮挡，只要三个 Finder Pattern 中至少有两个完整可见，就能被正确解码。</p>
            </div>
          </div>

          <div class="flex gap-4 p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="w-16 h-16 shrink-0 rounded flex items-center justify-center" style="background:#10b981">
              <svg width="36" height="36" viewBox="0 0 24 24">
                <line x1="4" y1="12" x2="20" y2="12" stroke="white" stroke-width="3" stroke-dasharray="3,3"/>
                <line x1="12" y1="4" x2="12" y2="20" stroke="white" stroke-width="3" stroke-dasharray="3,3"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">时钟图案（Timing Pattern）</div>
              <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">由水平和垂直两条黑白相间的交替线条组成，连接三个 Finder Pattern。时钟图案用于确定 QR 码的模块密度和坐标位置，帮助扫描设备计算每个数据模块的大小和位置。</p>
            </div>
          </div>

          <div class="flex gap-4 p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="w-16 h-16 shrink-0 rounded flex items-center justify-center" style="background:#6b7280">
              <svg width="36" height="36" viewBox="0 0 24 24">
                <circle cx="8" cy="8" r="2" fill="white"/>
                <circle cx="16" cy="8" r="2" fill="white"/>
                <circle cx="8" cy="16" r="2" fill="white"/>
                <circle cx="16" cy="16" r="2" fill="white"/>
                <circle cx="12" cy="12" r="2" fill="white"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">数据区域（Data Area）</div>
              <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">QR 码中除功能区域外的所有黑白模块组成了数据区域。数据以二进制形式编码为黑白模块（黑=1, 白=0），按照特定的排列规则存储。数据区域包含实际要编码的信息以及格式信息、版本信息等元数据。</p>
            </div>
          </div>

          <div class="flex gap-4 p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="w-16 h-16 shrink-0 rounded flex items-center justify-center" style="background:#f59e0b">
              <svg width="36" height="36" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3" fill="none" stroke="white" stroke-width="2"/>
                <circle cx="8" cy="16" r="3" fill="none" stroke="white" stroke-width="2"/>
                <circle cx="16" cy="16" r="3" fill="none" stroke="white" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">纠错码区域（Error Correction Area）</div>
              <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">根据选定的纠错级别，QR 码中会分配一定比例的区域用于存储纠错码。纠错码使用 Reed-Solomon 算法生成，当二维码被污损或部分遮挡时，可以利用纠错码恢复原始数据。纠错级别越高，能容忍的污损程度越高，但可存储的数据量会相应减少。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">三、纠错机制详解</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>QR 码最强大的特性之一就是纠错能力。即使二维码被遮挡、破损或变形，仍然可以被正确识别。这是通过 Reed-Solomon 纠错码实现的。</p>

        <p><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">四个纠错级别</strong></p>

        <!-- Error correction level comparison diagram -->
        <div class="flex justify-center my-6">
          <svg viewBox="0 0 480 120" width="440" height="110" xmlns="http://www.w3.org/2000/svg">
            <!-- L level -->
            <rect x="10" y="10" width="100" height="36" rx="4" fill="#2563eb" opacity="0.85"/>
            <text x="60" y="33" text-anchor="middle" font-size="13" font-weight="bold" fill="white">L</text>
            <text x="60" y="55" text-anchor="middle" font-size="9" fill="#6b7280">7% 恢复</text>

            <!-- M level -->
            <rect x="130" y="10" width="100" height="36" rx="4" fill="#059669" opacity="0.85"/>
            <text x="180" y="33" text-anchor="middle" font-size="13" font-weight="bold" fill="white">M</text>
            <text x="180" y="55" text-anchor="middle" font-size="9" fill="#6b7280">15% 恢复</text>

            <!-- Q level -->
            <rect x="250" y="10" width="100" height="36" rx="4" fill="#d97706" opacity="0.85"/>
            <text x="300" y="33" text-anchor="middle" font-size="13" font-weight="bold" fill="white">Q</text>
            <text x="300" y="55" text-anchor="middle" font-size="9" fill="#6b7280">25% 恢复</text>

            <!-- H level -->
            <rect x="370" y="10" width="100" height="36" rx="4" fill="#dc2626" opacity="0.85"/>
            <text x="420" y="33" text-anchor="middle" font-size="13" font-weight="bold" fill="white">H</text>
            <text x="420" y="55" text-anchor="middle" font-size="9" fill="#6b7280">30% 恢复</text>

            <text x="240" y="88" text-anchor="middle" font-size="10" fill="#9ca3af">容量↓ 纠错↑</text>
            <line x1="175" y1="78" x2="140" y2="78" stroke="#9ca3af" stroke-width="1" marker-end="url(#arrowL)"/>
            <line x1="305" y1="78" x2="340" y2="78" stroke="#9ca3af" stroke-width="1" marker-end="url(#arrowR)"/>
            <defs>
              <marker id="arrowL" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                <path d="M 0 0 L 5 3 L 0 6 z" fill="#9ca3af"/>
              </marker>
              <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 5 3 L 0 6 z" fill="#9ca3af"/>
              </marker>
            </defs>
          </svg>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">级别</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">恢复能力</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">L (Low)</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">可恢复约 7% 的码字</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">环境干净、不易损坏的场景，如电子屏幕展示</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">M (Medium)</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">可恢复约 15% 的码字</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">一般场景下最常用的级别</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">Q (Quartile)</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">可恢复约 25% 的码字</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">需要添加 Logo 或图标覆盖的情况</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">H (High)</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">可恢复约 30% 的码字</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">极端环境，如二维码印刷在产品表面可能被磨损</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4"><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">Reed-Solomon 纠错算法</strong><br>
        QR 码使用 Reed-Solomon 码（里德-所罗门码）作为纠错算法。这种算法将原始数据视为多项式的系数，通过计算冗余的多项式值来生成纠错码。当二维码被污损时，解码器可以利用剩余的完整数据和纠错码，通过求解方程组来恢复丢失的数据。Reed-Solomon 码广泛应用于光盘、卫星通信、二维码等场景，是一种经过验证的成熟纠错技术。</p>

        <p><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">Logo 放置原理</strong><br>
        理解了纠错机制，就明白为什么二维码中间可以放 Logo 了。Logo 遮挡的部分相当于"污损"，只要遮挡面积不超过纠错级别所能容忍的范围（如使用 H 级可容忍最多 30% 的遮挡），二维码就可以被正常扫描。这也是为什么我们常看到带 Logo 的二维码——在制作时将 Logo 放在中间，适当提高纠错级别即可。</p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">四、编码模式详解</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>QR 码支持多种数据编码模式，不同模式适用于不同类型的数据，效率和容量各不相同：</p>

        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">编码模式</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">字符集</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">最大容量（Version 40-L）</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">比特/字符</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">数字模式（Numeric）</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">0-9</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">7,089 个数字</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">3⅓</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">字母数字模式（Alphanumeric）</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">0-9 A-Z $%*+-./: 和空格</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">4,296 个字符</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">5½</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">字节模式（Byte）</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">ISO-8859-1（默认）/ UTF-8</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">2,953 字节</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">8</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">汉字模式（Kanji）</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">Shift JIS 汉字字符集</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">1,817 个汉字</td>
                <td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">13</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">编码过程</strong><br>
        QR 码的编码过程包括以下步骤：</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>数据分析</strong>：分析输入数据的类型，选择最高效的编码模式</li>
          <li><strong>数据编码</strong>：将数据按所选模式编码为二进制位流</li>
          <li><strong>添加终止符和填充位</strong>：在数据末尾添加终止符（0000）和填充位以填满数据容量</li>
          <li><strong>纠错码生成</strong>：使用 Reed-Solomon 算法计算纠错码并附加到数据后面</li>
          <li><strong>结构化排列</strong>：将数据和纠错码按规则交错排列</li>
          <li><strong>矩阵布局</strong>：在 QR 码矩阵中放置功能图案和数据模块</li>
          <li><strong>掩码处理</strong>：应用 XOR 掩码优化黑白模块的分布</li>
          <li><strong>格式信息编码</strong>：写入纠错级别和掩码方案等信息</li>
        </ul>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">五、版本与容量</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>QR 码共有 40 个版本（Version 1 ~ Version 40）。Version 1 最小，尺寸为 21×21 模块；Version 40 最大，尺寸为 177×177 模块。每增加一个版本，尺寸增加 4 个模块。</p>

        <!-- Version size comparison -->
        <div class="flex items-center justify-center gap-6 my-6">
          <div class="text-center">
            <svg width="70" height="70" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect width="21" height="21" rx="2" fill="white" stroke="#d1d5db" stroke-width="0.5"/>
              <g fill="#2563eb" opacity="0.7">
                <rect x="0" y="0" width="5" height="5"/><rect x="16" y="0" width="5" height="5"/>
                <rect x="0" y="16" width="5" height="5"/><rect x="8" y="8" width="2" height="2"/>
                <rect x="12" y="12" width="3" height="3"/><rect x="10" y="6" width="1" height="1"/>
                <rect x="14" y="9" width="2" height="2"/><rect x="6" y="10" width="1" height="2"/>
                <rect x="4" y="12" width="2" height="1"/><rect x="7" y="3" width="1" height="1"/>
                <rect x="14" y="3" width="1" height="2"/><rect x="3" y="8" width="2" height="1"/>
              </g>
              <text x="10" y="20" text-anchor="middle" font-size="2.5" fill="#9ca3af">V1</text>
            </svg>
            <div class="text-xs mt-1" :style="{ color: 'var(--text-secondary)' }">Version 1<br>21×21</div>
          </div>
          <div class="text-center">
            <svg width="90" height="90" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
              <rect width="33" height="33" rx="2" fill="white" stroke="#d1d5db" stroke-width="0.5"/>
              <g fill="#2563eb" opacity="0.5">
                <rect x="0" y="0" width="5" height="5"/><rect x="28" y="0" width="5" height="5"/>
                <rect x="0" y="28" width="5" height="5"/>
                <rect x="10" y="10" width="2" height="2"/><rect x="16" y="16" width="3" height="3"/>
                <rect x="22" y="12" width="2" height="2"/><rect x="8" y="20" width="3" height="1"/>
                <rect x="14" y="6" width="2" height="1"/><rect x="24" y="8" width="1" height="2"/>
                <rect x="6" y="14" width="1" height="1"/><rect x="18" y="24" width="2" height="2"/>
              </g>
              <text x="16" y="32" text-anchor="middle" font-size="3.5" fill="#9ca3af">V10</text>
            </svg>
            <div class="text-xs mt-1" :style="{ color: 'var(--text-secondary)' }">Version 10<br>57×57</div>
          </div>
          <div class="text-center">
            <svg width="110" height="110" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg">
              <rect width="57" height="57" rx="2" fill="white" stroke="#d1d5db" stroke-width="0.3"/>
              <g fill="#2563eb" opacity="0.35">
                <rect x="0" y="0" width="5" height="5"/><rect x="52" y="0" width="5" height="5"/>
                <rect x="0" y="52" width="5" height="5"/>
                <rect x="12" y="12" width="2" height="2"/><rect x="30" y="28" width="3" height="3"/>
                <rect x="40" y="16" width="2" height="2"/><rect x="16" y="36" width="3" height="2"/>
                <rect x="24" y="10" width="2" height="1"/><rect x="44" y="22" width="1" height="2"/>
              </g>
              <text x="28" y="56" text-anchor="middle" font-size="5" fill="#9ca3af">V40</text>
            </svg>
            <div class="text-xs mt-1" :style="{ color: 'var(--text-secondary)' }">Version 40<br>177×177</div>
          </div>
        </div>

        <p>不同版本和纠错级别下，QR 码能够存储的数据量差异很大。例如 Version 40 使用 L 级纠错时，最多可以存储 7,089 个数字或 4,296 个字母数字字符。而在最高纠错级别 H 下，同样 Version 40 只能存储 3,057 个数字或 1,852 个字母数字字符。</p>
        <p>选择版本时需要考虑：扫描设备的能力（如手机摄像头可以扫描很小的码但老式扫描仪可能不行）、印刷空间限制、数据量大小等因素。一般情况下，自动选择能容纳数据的最小版本即可。</p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">六、掩码处理</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>掩码（Mask）是 QR 编码中的重要步骤。在完成数据和纠错码的布局后，需要对数据区域应用 XOR 掩码操作。掩码的目的是优化黑白模块的分布，避免出现不利于扫描的图案，例如：</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>大面积的空白或全黑区域（可能导致扫描器无法定位模块边界）</li>
          <li>与 Finder Pattern 相同的图案（避免混淆）</li>
          <li>过长的同色线条（可能导致扫描时跳行或漏行）</li>
        </ul>
        <p>QR 码标准定义了 8 种掩码方案。编码器会尝试所有 8 种掩码，对每种结果计算惩罚分数（根据不良图案的多少打分），最终选择分数最低的掩码方案。掩码方案的编号会被编码在格式信息区域中，供解码器读取和使用。</p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">七、应用场景</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>二维码已经深入我们生活的方方面面，以下是几个主要应用领域：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">移动支付</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">支付宝、微信支付等平台的扫码支付已成为中国乃至全球最主流的支付方式。用户出示付款码或扫描商家二维码即可完成交易。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">网址跳转</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">扫描二维码直接打开网页、下载 App、关注公众号等，省去手动输入 URL 的麻烦。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">电子票务</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">电影票、火车票、飞机票、景区门票等广泛使用二维码电子票，检票时扫描即可快速通过。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">身份认证</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">微信扫码登录、健康码、电子身份证等场景中，二维码作为快速身份认证的载体。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">商品溯源</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">食品、药品等商品的包装上印有二维码，扫描可查看生产日期、产地、质检报告等信息。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">名片交换</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">电子名片（vCard）二维码被广泛应用于商务场景，扫描即可保存联系人信息到手机通讯录。</div>
          </div>
        </div>
      </div>
    </section>

    <div class="p-4 rounded-lg text-sm" :style="{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }">
      <p class="font-semibold mb-1" :style="{ color: 'var(--text-primary)' }">总结</p>
      <p>QR 码作为一种成熟的二维条码技术，融合了高效的编码算法、强大的纠错机制和巧妙的结构设计。从日常支付到工业溯源，二维码已经成为数字世界连接物理世界的重要桥梁。你可以使用本站的二维码工具来生成和解析二维码，亲身体验这些技术原理的实际应用。</p>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
