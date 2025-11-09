import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { MatProgressSpinner } from "@angular/material/progress-spinner"
import { Subscription } from 'rxjs'

import { LoadingService } from '../../services/loading.service'

@Component({
    selector: 'app-loading',
    imports: [MatProgressSpinner, CommonModule],
    styleUrl: './loading-screen.component.scss',
    template: `
    <div *ngIf="isLoading">
        <mat-spinner></mat-spinner>
    </div>
    `
})
export class LoadingScreenComponent implements OnInit, OnDestroy{
    /**
     * Subscription para o observable de loading
     */
    private subscription!: Subscription

    /**
     * Injeção do serviço de loading
     */
    private loadingService = inject(LoadingService)

    /**
     * Indica se está em estado de loading
     */
    isLoading = false
    
    /**
     * Método OnInit do componente
     */
    ngOnInit() {
        this.subscription = this.loadingService.getLoading()
            .subscribe(loading => {
                this.isLoading = loading
            })
    }

    /**
     * Método OnDestroy do componente
     */
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
