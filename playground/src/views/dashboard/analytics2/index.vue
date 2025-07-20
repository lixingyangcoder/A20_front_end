<!DOCTYPE html><html lang="zh-CN"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>企业风险预警平台</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://code.iconify.design/3/3.1.1/iconify.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
  <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');
      
      body {
          font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
          background-color: #f5f7fa;
      }
      
      .layout-container {
          width: 1440px;
          min-height: 900px;
          display: grid;
          grid-template-columns: 260px 1fr 320px;
          grid-template-rows: 60px 1fr;
          grid-template-areas:
              "header header header"
              "sidebar main alerts";
          gap: 16px;
          margin: 0 auto;
          background-color: #f5f7fa;
      }

      .header {
          grid-area: header;
      }

      .sidebar {
          grid-area: sidebar;
      }

      .main-content {
          grid-area: main;
      }

      .alert-panel {
          grid-area: alerts;
      }

      .risk-card {
          background: white;
          border: 1px solid #e1e5eb;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }

      .alert-tag {
          font-variant: small-caps;
          text-transform: uppercase;
      }

      .alert-critical { background-color: rgba(220, 53, 69, 0.1); color: #dc3545; }
      .alert-high { background-color: rgba(253, 126, 20, 0.1); color: #fd7e14; }
      .alert-medium { background-color: rgba(255, 193, 7, 0.1); color: #d59e0b; }
      .status-resolved { color: #198754; }
      .status-pending { color: #6c757d; }
      
      .chart-container {
          height: 100%;
          min-height: 200px;
      }
      
      .zone-card {
          background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
          color: white;
          border-radius: 8px;
      }
      
      .timeline-event {
          border-left: 2px solid #3b82f6;
      }
      
      .progress-bar {
          height: 8px;
          border-radius: 4px;
          background: #e9ecef;
      }
      
      .color-critical { background: linear-gradient(to right, #dc3545, #a71d2a); }
      .color-high { background: linear-gradient(to right, #fd7e14, #e8590c); }
      .color-medium { background: linear-gradient(to right, #ffc107, #e9a800); }
  </style>
</head>
<body class="bg-gray-100">
  <div class="layout-container p-4">
      <!-- 顶部导航栏 -->
      <header class="header risk-card flex items-center justify-between px-6">
          <div class="flex items-center">
              <span class="iconify text-xl text-[#1e3a8a]" data-icon="carbon:risk"></span>
              <span class="ml-3 text-xl font-bold text-[#1e3a8a]">企业风险预警平台</span>
          </div>
          
          <nav>
              <ul class="flex space-x-8 text-gray-700 font-medium">
                  <li class="text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1">风险看板</li>
                  <li>预警管理</li>
                  <li>风险库</li>
                  <li>分析报告</li>
                  <li>处置中心</li>
              </ul>
          </nav>
          
          <div class="flex items-center">
              <div class="relative mr-4">
                  <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                  <span class="iconify text-2xl text-gray-600" data-icon="mdi:bell-outline"></span>
              </div>
              <div class="flex items-center">
                  <img id="1" src="https://modao.cc/ai/uploads/ai_pics/1/17682/aigp_1752647691.jpeg" alt="User profile avatar" class="w-8 h-8 rounded-full">
                  <div class="ml-2">
                      <div class="text-sm font-medium">管理员</div>
                      <div class="text-xs text-gray-500">研发中心</div>
                  </div>
              </div>
          </div>
      </header>
      
      <!-- 左侧分类面板 -->
      <aside class="sidebar risk-card p-4">
          <h2 class="font-bold text-lg mb-4 flex items-center">
              <span class="iconify mr-2" data-icon="carbon:category"></span>
              风险分类
          </h2>
          
          <div class="space-y-3">
              <div class="font-medium text-gray-700 flex items-center">
                  <span class="iconify mr-2 text-red-500" data-icon="bi:exclamation-diamond-fill"></span>
                  运营风险
              </div>
              <ul class="ml-8 space-y-2 text-gray-600 mt-2">
                  <li>客户信用风险</li>
                  <li>供应链中断</li>
                  <li>合同违约</li>
              </ul>
              
              <div class="font-medium text-gray-700 flex items-center">
                  <span class="iconify mr-2 text-yellow-500" data-icon="bi:exclamation-diamond-fill"></span>
                  财务风险
              </div>
              <ul class="ml-8 space-y-2 text-gray-600 mt-2">
                  <li>资金流动性风险</li>
                  <li>汇率波动风险</li>
                  <li>债务风险</li>
              </ul>
              
              <div class="font-medium text-gray-700 flex items-center">
                  <span class="iconify mr-2 text-blue-500" data-icon="bi:exclamation-diamond-fill"></span>
                  合规风险
              </div>
              <ul class="ml-8 space-y-2 text-gray-600 mt-2">
                  <li>监管政策变更</li>
                  <li>法律诉讼风险</li>
                  <li>数据隐私风险</li>
              </ul>
          </div>
          
          <div class="mt-6">
              <h3 class="font-bold text-md mb-3">风险等级分布</h3>
              <div class="chart-container" id="riskLevelChart"></div>
          </div>
      </aside>
      
      <!-- 中央主内容区 -->
      <main class="main-content space-y-4">
          <!-- 风险地图热力图 -->
          <div class="risk-card p-4 h-80">
              <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-lg">区域风险热力图</h3>
                  <div class="flex text-sm">
                      更新时间: 2025-08-15 09:24 <span class="ml-3 text-green-500">●</span> 实时更新
                  </div>
              </div>
              <div class="chart-container" id="riskHeatmap"></div>
          </div>
          
          <!-- 中部内容区域 -->
          <div class="grid grid-cols-2 gap-4">
              <!-- 风险指标卡片 -->
              <div class="risk-card p-4">
                  <h3 class="font-bold text-lg mb-4">风险指标监控</h3>
                  <div class="space-y-4">
                      <div>
                          <div class="flex justify-between mb-1">
                              <span>财务异常指数</span>
                              <span class="font-mono">84/100</span>
                          </div>
                          <div class="progress-bar">
                              <div class="color-critical h-full rounded-full" style="width: 84%"></div>
                          </div>
                          <div class="text-right text-xs text-red-500 mt-1 font-medium">
                              高出行业均值40%
                          </div>
                      </div>
                      
                      <div>
                          <div class="flex justify-between mb-1">
                              <span>法律诉讼风险</span>
                              <span class="font-mono">63/100</span>
                          </div>
                          <div class="progress-bar">
                              <div class="color-high h-full rounded-full" style="width: 63%"></div>
                          </div>
                          <div class="text-right text-xs text-orange-500 mt-1">
                              上升趋势 <span class="font-mono">+12%</span>
                          </div>
                      </div>
                      
                      <div>
                          <div class="flex justify-between mb-1">
                              <span>供应链稳定性</span>
                              <span class="font-mono">42/100</span>
                          </div>
                          <div class="progress-bar">
                              <div class="color-medium h-full rounded-full" style="width: 42%"></div>
                          </div>
                          <div class="text-right text-xs mt-1">
                              <span class="text-green-500">近期改善</span>
                          </div>
                      </div>
                  </div>
                  
                  <div class="mt-6">
                      <h4 class="font-bold mb-3">多维风险对比评价</h4>
                      <div class="chart-container" id="radarChart"></div>
                  </div>
              </div>
              
              <!-- 近期事件时间轴 -->
              <div class="risk-card p-4">
                  <h3 class="font-bold text-lg mb-4">近期风险事件追踪</h3>
                  <div class="space-y-4">
                      <div class="timeline-event pl-4 border-l-2">
                          <div class="flex justify-between">
                              <div class="font-medium">华东区域供应商延迟交付</div>
                              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">运营风险</span>
                          </div>
                          <div class="text-sm text-gray-500 mt-1">2025-08-14 14:30</div>
                          <div class="mt-2 text-gray-700">
                              关键物料供货延迟影响生产计划，已启动备选方案
                          </div>
                          <div class="mt-2 flex items-center text-sm">
                              <span class="status-pending">待处理</span>
                              <span class="ml-auto flex items-center text-orange-500">
                                  <span class="iconify mr-1" data-icon="mdi:clock-outline"></span>
                                  高优先级
                              </span>
                          </div>
                      </div>
                      
                      <div class="timeline-event pl-4 border-l-2">
                          <div class="flex justify-between">
                              <div class="font-medium">数据安全合规预警</div>
                              <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">合规风险</span>
                          </div>
                          <div class="text-sm text-gray-500 mt-1">2025-08-12 10:45</div>
                          <div class="mt-2 text-gray-700">
                              监管发布新数据隐私法规，业务合规部评估中
                          </div>
                          <div class="mt-2 flex items-center text-sm">
                              <span class="status-resolved">已处理</span>
                              <div class="ml-auto flex items-center text-gray-500">
                                  <img id="2" src="https://modao.cc/ai/uploads/ai_pics/1/17683/aigp_1752647693.jpeg" alt="User avatar for team member" class="w-5 h-5 rounded-full">
                                  <span class="ml-1">张经理</span>
                              </div>
                          </div>
                      </div>
                      
                      <div class="timeline-event pl-4 border-l-2">
                          <div class="flex justify-between">
                              <div class="font-medium">资金流动性风险预警</div>
                              <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">财务风险</span>
                          </div>
                          <div class="text-sm text-gray-500 mt-1">2025-08-10 16:20</div>
                          <div class="mt-2 text-gray-700">
                              现金流预测显示未来季度存在缺口，需调整资金计划
                          </div>
                          <div class="mt-2 flex items-center text-sm">
                              <span class="status-pending">待处理</span>
                              <span class="ml-auto flex items-center text-red-500">
                                  <span class="iconify mr-1" data-icon="mdi:alert"></span>
                                  紧急
                              </span>
                          </div>
                      </div>
                  </div>
                  
                  <button class="w-full mt-4 py-2 text-center bg-[#1e3a8a] text-white rounded-md hover:bg-blue-900 transition">
                      查看全部风险事件 (12项)
                  </button>
              </div>
          </div>
          
          <!-- 处置建议生成面板 -->
          <div class="risk-card p-4">
              <h3 class="font-bold text-lg mb-4">智能化处置建议</h3>
              <div class="flex items-start">
                  <div class="w-1/2 pr-4">
                      <div class="zone-card p-4 rounded-lg">
                          <div class="text-xl font-bold mb-2">当前风险场景</div>
                          <ul class="space-y-1 text-slate-200">
                              <li class="flex items-center">
                                  <span class="iconify mr-2" data-icon="bi:check-circle"></span>
                                  财务流动性紧张
                              </li>
                              <li class="flex items-center">
                                  <span class="iconify mr-2" data-icon="bi:check-circle"></span>
                                  供应链交付延迟
                              </li>
                              <li class="flex items-center">
                                  <span class="iconify mr-2" data-icon="bi:check-circle"></span>
                                  市场营销投入不足
                              </li>
                          </ul>
                          <div class="mt-4 bg-blue-900/50 p-3 rounded">
                              <span class="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></span>
                              <span class="text-sm">系统分析完成，可生成多方案建议</span>
                          </div>
                      </div>
                  </div>
                  
                  <div class="w-1/2 pl-4">
                      <div class="font-medium mb-2">建议处置方案</div>
                      <div class="flex space-x-4 mb-4">
                          <button class="px-4 py-2 border border-[#1e3a8a] text-[#1e3a8a] rounded hover:bg-blue-50">
                              短期释压方案
                          </button>
                          <button class="px-4 py-2 border border-[#1e3a8a] text-[#1e3a8a] rounded hover:bg-blue-50">
                              战略转型方案
                          </button>
                          <button class="px-4 py-2 border border-[#1e3a8a] text-[#1e3a8a] rounded hover:bg-blue-50">
                              资本优化方案
                          </button>
                      </div>
                      
                      <div class="bg-blue-50 border border-blue-200 rounded p-4 h-40 overflow-y-auto hide-scrollbar">
                          <h4 class="font-medium mb-2">短期释压方案建议</h4>
                          <ul class="space-y-1 text-sm text-gray-700">
                              <li>▶ 与核心供应商谈判延长60天付款周期</li>
                              <li>▶ 加速应收账款回收，启动重点客户催收</li>
                              <li>▶ 优化短期融资结构，考虑短期商业票据</li>
                              <li>▶ 降低70%非必要营销经费，周期3个月</li>
                          </ul>
                      </div>
                      
                      <button class="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center justify-center">
                          <span class="iconify mr-2" data-icon="mdi:file-document-outline"></span>
                          生成完整处置报告
                      </button>
                  </div>
              </div>
          </div>
      </main>
      
      <!-- 右侧预警通知侧边栏 -->
      <aside class="alert-panel">
          <div class="risk-card p-4 h-full">
              <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-lg">实时预警消息</h3>
                  <div>
                      <span class="iconify cursor-pointer" data-icon="mdi:autorenew"></span>
                  </div>
              </div>
              
              <div class="space-y-4 h-[820px] overflow-y-auto hide-scrollbar">
                  <div class="p-3 rounded-lg alert-critical">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">紧急运营事件</div>
                              <div class="text-sm mt-1">核心产线设备突发故障</div>
                          </div>
                          <span class="bg-red-500 text-white px-2 py-1 rounded text-xs alert-tag">紧急</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">华南工厂A3生产线 · 5分钟前</div>
                      <div class="mt-3 text-sm">
                          设备停机可能导致产线停滞，需技术人员紧急处理
                      </div>
                  </div>
                  
                  <div class="p-3 rounded-lg alert-high">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">市场风险预警</div>
                              <div class="text-sm mt-1">竞品大规模降价冲击市场</div>
                          </div>
                          <span class="bg-orange-500 text-white px-2 py-1 rounded text-xs alert-tag">高危</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">销售监控系统 · 1小时前</div>
                      <div class="mt-3 text-sm">
                          主要竞品全线降价15%，或影响季度销售目标达成
                      </div>
                      <div class="mt-2 flex">
                          <img id="3" src="https://modao.cc/ai/uploads/ai_pics/1/17684/aigp_1752647695.jpeg" alt="Product comparison chart" class="h-24 w-32 mr-2 rounded-sm">
                          <img id="4" src="https://modao.cc/ai/uploads/ai_pics/1/17685/aigp_1752647697.jpeg" alt="Market share analysis" class="h-24 w-32 rounded-sm">
                      </div>
                  </div>
                  
                  <div class="p-3 rounded-lg alert-medium">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">合同履行提醒</div>
                              <div class="text-sm mt-1">关键客户合同即将到期</div>
                          </div>
                          <span class="bg-yellow-500 text-white px-2 py-1 rounded text-xs alert-tag">警告</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">客户管理中心 · 3小时前</div>
                      <div class="mt-3 text-sm">
                          大客户环球科技2023年合同30天后到期，续约方案待提交
                      </div>
                  </div>
                  
                  <div class="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">审计工作提醒</div>
                              <div class="text-sm mt-1">季度财务审计截止日</div>
                          </div>
                          <span class="bg-blue-500 text-white px-2 py-1 rounded text-xs alert-tag">例行</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">审计部系统 · 4小时前</div>
                      <div class="mt-3 text-sm">
                          三季度财务审计材料需在9月5日前提交
                      </div>
                  </div>
                  
                  <div class="p-3 rounded-lg alert-high">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">天气灾害预警</div>
                              <div class="text-sm mt-1">强台风可能影响物流运输</div>
                          </div>
                          <span class="bg-orange-500 text-white px-2 py-1 rounded text-xs alert-tag">高危</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">物流监控系统 · 6小时前</div>
                      <div class="mt-3 text-sm">
                          台风"海神"预计48小时内在华东沿海登陆，请防范物流延迟
                      </div>
                  </div>
                  
                  <div class="p-3 rounded-lg alert-critical">
                      <div class="flex justify-between items-start">
                          <div>
                              <div class="font-bold">信息安全事件</div>
                              <div class="text-sm mt-1">检测到异常登录请求</div>
                          </div>
                          <span class="bg-red-500 text-white px-2 py-1 rounded text-xs alert-tag">紧急</span>
                      </div>
                      <div class="text-xs text-gray-600 mt-2">安全监控中心 · 7小时前</div>
                      <div class="mt-3 text-sm">
                          检测到财务系统17次异常登录尝试，已启动阻断策略
                      </div>
                  </div>
              </div>
          </div>
      </aside>
  </div>
  
  <script>
      // ECharts初始化
      document.addEventListener('DOMContentLoaded', function() {
          // 风险等级分布环形图
          const riskLevelChart = echarts.init(document.getElementById('riskLevelChart'));
          riskLevelChart.setOption({
              tooltip: { trigger: 'item' },
              legend: { show: false },
              series: [{
                  name: '风险等级',
                  type: 'pie',
                  radius: ['45%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                      borderRadius: 6,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  label: { show: false },
                  labelLine: { show: false },
                  data: [
                      { value: 156, name: '紧急', itemStyle: { color: '#dc3545' } },
                      { value: 342, name: '高危', itemStyle: { color: '#fd7e14' } },
                      { value: 486, name: '警告', itemStyle: { color: '#ffc107' } },
                      { value: 132, name: '关注', itemStyle: { color: '#6f42c1' } }
                  ]
              }]
          });

          // 风险地图热力图
          const riskHeatmap = echarts.init(document.getElementById('riskHeatmap'));
          riskHeatmap.setOption({
              tooltip: { position: 'top' },
              visualMap: {
                  min: 0,
                  max: 100,
                  calculable: true,
                  orient: 'horizontal',
                  left: 'center',
                  bottom: 10,
                  inRange: {
                      color: ['#3b82f6', '#ef4444']
                  }
              },
              series: [{
                  name: '区域风险',
                  type: 'heatmap',
                  data: randomHeatmapData(),
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }]
          });

          // 随机生成热力图数据
          function randomHeatmapData() {
              const data = [];
              for (let i = 0; i < 10; i++) {
                  for (let j = 0; j < 10; j++) {
                      // 随机生成部分高风险区域
                      let value = Math.random() * 40 + 20;
                      if ((i === 3 && j === 7) || (i === 8 && j === 2)) {
                          value = Math.random() * 50 + 60;
                      }
                      if ((i === 5 && j === 5) || (i === 2 && j === 4)) {
                          value = Math.random() * 30 + 70;
                      }
                      data.push([j, i, value]);
                  }
              }
              return data;
          }

          // 多维风险雷达图
          const radarChart = echarts.init(document.getElementById('radarChart'));
          radarChart.setOption({
              radar: {
                  indicator: [
                      { name: '财务指标', max: 100 },
                      { name: '合规风险', max: 100 },
                      { name: '市场表现', max: 100 },
                      { name: '运营效率', max: 100 },
                      { name: '技术保障', max: 100 },
                      { name: '人力资源', max: 100 }
                  ],
                  splitNumber: 5,
                  shape: 'circle',
                  axisName: {
                      color: '#666',
                      fontSize: 12
                  }
              },
              series: [{
                  name: '风险评价',
                  type: 'radar',
                  data: [{
                      value: [68, 73, 85, 62, 74, 58],
                      name: '当前状态',
                      areaStyle: {
                          color: 'rgba(59,130,246,0.2)'
                      },
                      lineStyle: {
                          color: '#3b82f6'
                      },
                      symbol: 'circle',
                      symbolSize: 6
                  }]
              }]
          });
          
          // 响应窗口调整
          window.addEventListener('resize', function() {
              riskLevelChart.resize();
              riskHeatmap.resize();
              radarChart.resize();
          });
      });
  </script>

</body></html>
