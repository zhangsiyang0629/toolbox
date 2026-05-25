<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import AdBanner from '@/components/AdBanner.vue'

usePageMeta('正则表达式教程 - 从入门到精通', '正则表达式（Regular Expression）完整教程：元字符详解、常用表达式速查、分组与捕获、修饰符说明、实际应用场景')
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <AdBanner position="header" />

    <h1 class="text-3xl font-bold mb-2">正则表达式教程</h1>
    <p class="text-sm mb-8" :style="{ color: 'var(--text-secondary)' }">Regular Expression（RegEx）从入门到精通</p>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">一、什么是正则表达式？</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>正则表达式（Regular Expression，简称 RegEx）是一种用于描述字符串匹配模式的表达式。它使用元字符和普通字符的组合来定义搜索模式，广泛应用于文本处理、数据验证、字符串搜索与替换等场景。</p>
        <p>正则表达式的历史可以追溯到 1956 年，数学家 Stephen Kleene 提出了正则集合的概念。后来 Unix 系统中的 ed、sed、grep、awk 等工具普及了正则表达式的使用。如今几乎所有主流编程语言都内置了正则表达式引擎。</p>
        <p>学习正则表达式就像学习一门外语——看似复杂，但掌握后能极大地提升文本处理效率。<strong>一条写好的正则表达式能替代几十行甚至上百行的字符串处理代码</strong>。</p>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">二、元字符详解</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>元字符是正则表达式中具有特殊含义的字符，它们是构建正则表达式的基石。</p>

        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">元字符</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">说明</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">.</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配除换行符外的任意单个字符</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">c.t → cat/cot/cut</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\d</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配任意数字，等价于 [0-9]</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\d{3} → 123</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\D</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配任意非数字字符</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\D+ → abc</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\w</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配字母、数字、下划线，等价于 [a-zA-Z0-9_]</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\w+ → hello_123</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\W</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配非单词字符</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\W → @!#</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\s</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配空白字符（空格、制表符、换行等）</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\s → 空格</td></tr>
              <tr><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">\S</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配非空白字符</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\S+ → Hello</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">三、量词与位置锚点</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>量词用于控制前面字符或子表达式出现的次数：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">* — 匹配 0 次或多次</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">go*gle → gogle / gogole / google</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">+ — 匹配 1 次或多次</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">go+gle → gogle / google（不能匹配 ggle）</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">? — 匹配 0 次或 1 次</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">colou?r → color / colour</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">{n,m} — 匹配 n 到 m 次</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">\d{3,5} → 123 / 1234 / 12345</div>
          </div>
        </div>

        <p>位置锚点用于匹配字符串中的特定位置：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">^ — 匹配字符串开头</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">^Hello → 匹配 "Hello World" 中的 Hello</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">$ — 匹配字符串结尾</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">World$ → 匹配 "Hello World" 中的 World</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">\b — 匹配单词边界</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">\bcat\b → 匹配 "cat" 但不匹配 "category"</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">\B — 匹配非单词边界</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">\Bcat\B → 匹配 "category" 中的 "cat"</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">四、字符类与分组</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">字符类</strong>（Character Class）用方括号定义，匹配指定字符集合中的任意一个：</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[aeiou] 匹配任意元音字母</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[0-9] 匹配任意数字</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[a-zA-Z] 匹配任意字母</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[^0-9] 匹配非数字字符</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[.\n] 匹配点号或换行符</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[\u4e00-\u9fff] 匹配中文字符</div>
          </div>
        </div>

        <p><strong class="font-semibold" :style="{ color: 'var(--text-primary)' }">分组与捕获</strong>：使用圆括号 <code class="px-1 py-0.5 rounded text-xs font-mono" :style="{ backgroundColor: 'var(--bg-primary)' }">()</code> 将多个字符组合为一个单元，并捕获匹配的内容供后续引用。</p>
        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">// 分组捕获
(\d{4})-(\d{2})-(\d{2})  匹配 "2024-01-15"
→ 捕获组 $1 = "2024", $2 = "01", $3 = "15"

// 非捕获组 (?:...)
(?:Mr|Mrs|Ms)\. (\w+)  不捕获称呼，只捕获名字

// 反向引用
(\w)\1  匹配重复字符，如 "aa", "bb", "11"

// 命名捕获组 (ES2018+)
(?&lt;year&gt;\d{4})-(?&lt;month&gt;\d{2})-(?&lt;day&gt;\d{2})</pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">五、常用正则表达式速查</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">用途</th>
                <th class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">正则表达式</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">邮箱</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">[\w.-]+@[\w.-]+\.\w+</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配标准邮箱格式</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">手机号</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">1[3-9]\d{9}</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">中国大陆手机号</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">URL</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">https?://[\w./?-]+</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配 HTTP/HTTPS URL</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">IP v4</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配 IPv4 地址</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">日期</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\d{4}-\d{2}-\d{2}</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">YYYY-MM-DD 格式</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">中文</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">[\u4e00-\u9fff]+</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配中文字符</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">Hex 颜色</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">#[0-9a-fA-F]{6}</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配 #RRGGBB 格式</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">数字</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">-?\d+(\.\d+)?</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">匹配整数或小数</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">身份证</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\d{17}[\dXx]</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">18 位身份证号</td></tr>
              <tr><td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">邮编</td><td class="px-3 py-2 border font-mono" :style="{ borderColor: 'var(--border-color)' }">\d{6}</td><td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">6 位数字邮编</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">六、修饰符（Flags）</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>修饰符用于改变正则表达式的匹配行为：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">g — 全局匹配</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">默认只返回第一个匹配，加上 g 后返回所有匹配结果。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">i — 忽略大小写</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">匹配时不区分字母大小写，/hello/i 可匹配 "Hello"。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">m — 多行模式</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">改变 ^ 和 $ 的行为，使它们匹配每一行的开头和结尾而不是整个字符串的开头和结尾。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">s — 点号匹配换行</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">默认 . 不匹配换行符，加上 s 后 . 可以匹配包括换行符在内的任意字符。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">u — Unicode 模式</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">启用 Unicode 匹配，支持 \u{...} 语法和正确处理 4 字节 UTF-16 字符。</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">y — 粘连模式</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">从 lastIndex 位置开始匹配，如果该位置不匹配则停止，不会自动前进。</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">七、正向预查与负向预查</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>预查（Lookahead）用于匹配后面（或前面）跟着特定模式的字符串，但不消耗字符：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">正向预查 (?=...)</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">\d(?=px)</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">匹配后面跟着 "px" 的数字，如 "16px" 中的 "16"</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">负向预查 (?!...)</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">\d(?!px)</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">匹配后面不跟着 "px" 的数字</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">正向后顾 (?&lt;=...)</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">(?&lt;=\$) \d+</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">匹配前面是 "$" 的数字，如 "$100" 中的 "100"</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-xs mb-1" :style="{ color: 'var(--text-primary)' }">负向后顾 (?&lt;!...)</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">(?&lt;!\$) \d+</div>
            <div class="text-xs" :style="{ color: 'var(--text-secondary)' }">匹配前面不是 "$" 的数字</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">八、正则表达式的实际应用</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>正则表达式的应用场景非常广泛：</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>表单验证</strong>：邮箱格式、手机号、密码强度、身份证号等前端表单验证，正则是最常用也最高效的方式。</li>
          <li><strong>日志分析</strong>：从服务器日志中提取 IP、时间戳、错误信息等关键数据。</li>
          <li><strong>代码重构</strong>：批量查找替换代码中的模式，如修改变量命名风格、迁移 API 调用等。</li>
          <li><strong>爬虫数据提取</strong>：从 HTML 或文本中提取特定模式的数据。</li>
          <li><strong>语法高亮</strong>：代码编辑器的语法高亮功能依赖正则表达式来识别关键字、字符串、注释等。</li>
          <li><strong>路由匹配</strong>：Web 框架使用正则来匹配 URL 路由模式。</li>
        </ul>
      </div>
    </section>

    <div class="p-4 rounded-lg text-sm" :style="{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }">
      <p class="font-semibold mb-1" :style="{ color: 'var(--text-primary)' }">总结</p>
      <p>正则表达式是每位开发者都应该掌握的强大工具。虽然学习曲线较陡，但一旦掌握就能在文本处理中游刃有余。建议多练习、多使用本站的正则测试工具来加深理解。记住一条谚语：<strong>「有些人在遇到问题时会想：我知道，我可以用正则表达式来解决。现在他有了两个问题。」</strong>——正则虽强大，但也要适度使用。</p>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
