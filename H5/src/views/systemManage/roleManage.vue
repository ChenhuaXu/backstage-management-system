<template>
  <div class="role-manage bg-white box-shadow p-2">
    <header>
      <el-button type="primary" @click="operate(null)">新增</el-button>
      <section class="pull-right">
        <el-input v-model.trim="queryForm.name" type="text" placeholder="请输入角色名称" style="width: 200px"></el-input>
        <el-button type="primary" @click="query(1, pageSize)">查询</el-button>
      </section>
    </header>
    <main class="m-y-t-2">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="启用状态" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '0' ? 'success' : 'danger'">
              {{ scope.row.status === '0' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center" show-overflow-tooltip :width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="operate(scope)">编辑</el-button>
            <el-button type="danger" @click="remove(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="m-y-t-2 text-right"
        :total="totalCount"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentPageChange"
        @size-change="pageSizeChange">
      </el-pagination>
    </main>

    <!-- 新增修改弹窗 -->
    <el-dialog
      :title="`${modalTitle}角色`"
      :visible.sync="modalVisible"
      :mask-closable="false"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input type="search" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="绑定菜单" prop="menu">
          <el-tree
            ref="menuTree"
            :data="menuList"
            show-checkbox
            :props="treeProps"
            default-expand-all>
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="confirmOperate('form')">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { systemApi } from '@/apis'
export default {
  name: 'role-manage',
  data () {
    return {
      queryForm: {
        name: ''
      },
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      totalCount: 0,
      modalVisible: false,
      modalTitle: '',
      menuList: [],
      treeProps: {
        label: 'title',
        children: 'children'
      },
      form: {
        name: '',
        status: '0'
      }
    }
  },
  methods: {
    query (page, size) {
      this.loading = true
      systemApi.userRoleList({
        name: this.queryForm.name,
        currentPage: page,
        pageSize: size
      }).then(({resultCode, result, msg}) => {
        this.tableData = result.dataList
        this.totalCount = result.totalNum
        this.currentPage = page
        this.loading = false
      })
    },

    currentPageChange (page) {
      this.currentPage = page
      this.query(page, this.pageSize)
    },

    pageSizeChange (size) {
      this.pageSize = size
      this.query(1, size)
    },

    operate (params) {
      this.modalVisible = true
      this.rcdOpeType = params ? '1' : '0'
      this.modalTitle = params ? '修改' : '新增'
      if (!params) return false
      // Todo
    },

    confirmOperate () {
      let [request, params] = [null, {}]
      if (this.rcdOpeType === '0') {
        request = systemApi.createRole
        params = {}
      } else {
        request = systemApi.updateRole
        params = {}
      }
      request(params).then(({resultCode, result, msg}) => {
        this.$message.success(msg)
        this.modalVisible = false
        this.query(this.currentPage, this.pageSize)
        this.cancelOperate()
      })
    },

    cancelOperate () {
      this.modalVisible = false
      this.form = {
        name: '',
        status: '0'
      }
    },

    remove (params) {
      systemApi.removeRole().then(({resultCode, result, msg}) => {
        this.$message.success(msg)
        this.query(this.currentPage, this.pageSize)
      })
    },

    async getMenuList () {
      let { result } = await systemApi.menuList()
      this.menuList = result
    }
  },
  mounted () {
    this.query(this.currentPage, this.pageSize)
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.role-manage {
}
</style>